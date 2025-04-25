import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private httpService: HttpService,
  ) {}

  private readonly chapaSecret = process.env.CHAPA_SECRET_KEY;

  async createChapaPayment(dto: CreatePaymentDto) {
    const payload = {
      amount: '200',
      currency: 'ETB',
      email: dto.email,
      name: dto.name,
      tx_ref: `chewatatest-${Date.now()}`,
      callback_url: 'https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60',
      return_url: 'https://www.google.com/',
      meta: {
        hide_receipt: true,
      },
    };

    const headers = {
      Authorization: `Bearer ${this.chapaSecret}`,
      'Content-Type': 'application/json',
    };

    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.chapa.co/v1/transaction/initialize',
        payload,
        {
          headers,
        },
      ),
    );

    return response.data;
  }

  async saveTelebirrScreenshot(email: string, filename: string) {
    await this.paymentModel.create({
      email,
      amount: '200',
      method: 'telebirr',
      screenshot: filename,
      status: 'pending',
    });

    return {
      message: 'Screenshot uploaded successfully. Awaiting admin approval.',
    };
  }

  async getTelebirrInstructions(email: string) {
    return {
      message: 'Please transfer 200 ETB to the following account.',
      merchant: 'MS-League',
      short_code: '123456',
      account_number: '0987654321',
      instructions:
        'After payment, upload your screenshot to /payment/telebirr/upload.',
    };
  }

  async extendMembership(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);

    user.hasPaid = true;
    user.paymentStatus = 'approved';
    user.membershipExpires = expiry;
    await user.save();
  }

  async getUserPayments(email: string) {
    return this.paymentModel.find({ email }).sort({ createdAt: -1 }).limit(1);
  }
}
