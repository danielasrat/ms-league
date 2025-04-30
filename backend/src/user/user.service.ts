import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas//user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from '../mail/mail.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { NotFoundException } from '@nestjs/common';
import { ProcessPaymentDto } from './dto/payment.dto';

@Injectable()
export class UserService {
  userRepository: any;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async findById(id: string) {
    return this.userModel.findById(id);
  }
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    console.log('Login attempt with email:', user);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (user.status !== 'approved') {
      throw new UnauthorizedException('Your account is not approved yet');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ userId: user._id, email: user.email });
    console.log('Generated token:', user.email, user.name); // Debugging line
    // Return both the token and user details
    return {
      token,
      user: {
        email: user.email,
        Name: user.name, // Assuming you have these fields in your schema
      },
    };
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.userModel.create({ ...dto, password: hashedPassword });
  }

  async getPending() {
    return this.userModel.find({ status: 'pending' });
  }

  async approve(id: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true },
    );
    if (user) {
      await this.mailService.sendApprovalEmail(user.email);
    }
    return user;
  }

  async reject(id: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true },
    );
    if (user) {
      await this.mailService.sendRejectionEmail(user.email);
    }
    return user;
  }
  async extendMembership(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      user.membership_expiry_date = new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      );
      await this.userRepository.save(user);
    }
  }

  async updateProfile(userId: string, updateDto: UpdateProfileDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateDto.password) {
      const salt = await bcrypt.genSalt();
      updateDto.password = await bcrypt.hash(updateDto.password, salt);
    }

    // Only update allowed fields
    const allowedFields = ['name', 'phone', 'password', 'profileImage'];
    for (const field of allowedFields) {
      if (updateDto[field] !== undefined) {
        user[field] = updateDto[field];
      }
    }

    await user.save();
    return {
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
        profileImage: user.profileImage,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('name phone email profileImage');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getMembershipStatus(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('hasPaid daysLeft membershipExpires paymentMethod status');
    if (!user) throw new NotFoundException('User not found');

    // Recalculate days left if needed
    if (user.membershipExpires) {
      user.daysLeft = this.calculateDaysLeft(user.membershipExpires);
      await user.save();
    }

    return user;
  }

  async processPayment(paymentDto: ProcessPaymentDto) {
    const user = await this.userModel.findById(paymentDto.userId);
    if (!user) throw new NotFoundException('User not found');

    const paymentDate = new Date();
    const membershipExpires = new Date();
    membershipExpires.setMonth(membershipExpires.getMonth() + 3); // 3 months from now

    user.hasPaid = true;
    user.paymentDate = paymentDate;
    user.membershipExpires = membershipExpires;
    user.paymentMethod = paymentDto.paymentMethod;
    user.daysLeft = this.calculateDaysLeft(membershipExpires);

    await user.save();
    return user;
  }

  // Add this new method to UserService
  async togglePaymentStatus(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.hasPaid = !user.hasPaid;

    if (user.hasPaid) {
      // If marking as paid, set payment date and expiration
      const paymentDate = new Date();
      const membershipExpires = new Date();
      membershipExpires.setMonth(membershipExpires.getMonth() + 3);

      user.paymentDate = paymentDate;
      user.membershipExpires = membershipExpires;
      user.daysLeft = this.calculateDaysLeft(membershipExpires);
    } else {
      // If marking as unpaid, clear payment info
      user.paymentDate = undefined;
      user.membershipExpires = undefined;
      user.daysLeft = 0;
      user.paymentMethod = '';
    }

    await user.save();
    return user;
  }

  private calculateDaysLeft(expiryDate: Date): number {
    const now = new Date();
    const diffInTime = expiryDate.getTime() - now.getTime();
    return Math.ceil(diffInTime / (1000 * 3600 * 24));
  }

  async findAllUsers(filter: any = {}) {
    return this.userModel.find(filter).sort({ createdAt: -1 });
  }

  async getUsersByStatus(status: string) {
    return this.userModel.find({ status }).sort({ createdAt: -1 });
  }

  async searchUsers(query: string) {
    return this.userModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
      ],
    });
  }

  async filterUsersByPayment(hasPaid: boolean) {
    return this.userModel.find({ hasPaid }).sort({ membershipExpires: 1 });
  }

  async filterUsersByDateRange(startDate: Date, endDate: Date) {
    return this.userModel.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });
  }

  async updateMembershipStatus() {
    const now = new Date();
    const users = await this.userModel.find({
      membershipExpires: { $lte: now },
      hasPaid: true,
    });

    for (const user of users) {
      user.hasPaid = false;
      user.status = 'pending'; // or whatever you prefer
      await user.save();
    }

    return { updated: users.length };
  }
}
