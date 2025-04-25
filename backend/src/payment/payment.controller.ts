import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PaymentService } from './payment.service';
import { UserService } from '../user/user.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly usersService: UserService,
  ) {}

  // @Post('chapa')
  // async payWithChapa(@Body() body: any) {
  //   console.log('Chapa payment request received');
  //   const paymentLink = await this.paymentService.createChapaPayment(body);
  //   return { url: paymentLink.url };

  // @Post('chapa')
  // async createChapaPayment(
  //   @Body() paymentData: { amount: string; email: string; name: string },
  // ) {
  //   console.log('Received paymentData:', paymentData); // Add this
  //   return this.paymentService.createChapaPayment(paymentData);
  // }

  @Post('chapa')
  async createChapaPayment(@Body() paymentData: CreatePaymentDto) {
    console.log('Received paymentData:', paymentData);
    return this.paymentService.createChapaPayment(paymentData);
  }

  @Post('telebirr')
  async getTelebirrInstructions(@Body() body: any) {
    return {
      message: 'Please transfer 200 ETB to the following account.',
      merchant: 'MS-League',
      short_code: '123456',
      account_number: '0987654321',
      instructions:
        'After payment, upload your screenshot to /payment/telebirr/upload.',
    };
  }

  @Post('telebirr/upload')
  @UseInterceptors(
    FileInterceptor('screenshot', {
      storage: diskStorage({
        destination: './uploads/telebirr',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async handleTelebirrUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.paymentService.saveTelebirrScreenshot(
      body.email,
      file.filename,
    );
  }

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    if (body.status === 'success') {
      const userEmail = body.email;
      await this.usersService.extendMembership(userEmail);
    }
    return { received: true };
  }
}
