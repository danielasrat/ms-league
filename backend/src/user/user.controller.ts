import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProcessPaymentDto } from './dto/payment.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    console.log(
      'Login attempt with email:',
      this.userService.login(email, password),
    ); // Debugging line
    return this.userService.login(email, password);
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard)
  async getPendingUsers() {
    return this.userService.getPending();
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard)
  async approveUser(@Param('id') id: string) {
    return this.userService.approve(id);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard)
  async rejectUser(@Param('id') id: string) {
    return this.userService.reject(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads/profile-images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateProfile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user.userId;
    if (file) {
      updateProfileDto.profileImage = file.filename; // or save the full path if you want
    }
    return this.userService.updateProfile(userId, updateProfileDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    const userId = req.user.userId;
    return this.userService.getProfile(userId);
  }

  @Post('process-payment')
  @UseGuards(JwtAuthGuard)
  async processPayment(@Body() paymentDto: ProcessPaymentDto) {
    return this.userService.processPayment(paymentDto);
  }

  // Add this new endpoint
  @Patch(':id/toggle-payment')
  @UseGuards(JwtAuthGuard)
  async togglePaymentStatus(@Param('id') id: string) {
    return this.userService.togglePaymentStatus(id);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Query('status') status?: string,
    @Query('payment') payment?: string,
    @Query('search') search?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (status) {
      return this.userService.getUsersByStatus(status);
    }
    if (payment) {
      const hasPaid = payment === 'paid';
      return this.userService.filterUsersByPayment(hasPaid);
    }
    if (search) {
      return this.userService.searchUsers(search);
    }
    if (startDate && endDate) {
      return this.userService.filterUsersByDateRange(
        new Date(startDate),
        new Date(endDate),
      );
    }
    return this.userService.findAllUsers();
  }

  @Get('membership-status')
  @UseGuards(JwtAuthGuard)
  async getMembershipStatus(@Req() req) {
    const userId = req.user.userId;
    const user = await this.userService.getMembershipStatus(userId);
    return {
      hasPaid: user.hasPaid,
      daysLeft: user.daysLeft,
      membershipExpires: user.membershipExpires,
      paymentMethod: user.paymentMethod,
      status: user.status,
    };
  }

  @Patch('update-memberships')
  @UseGuards(JwtAuthGuard)
  async updateMemberships() {
    return this.userService.updateMembershipStatus();
  }
}
