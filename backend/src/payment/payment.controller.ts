import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { PaymentService } from './payment.service';
import { UserService } from '../user/user.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { existsSync, createReadStream } from 'fs';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly usersService: UserService,
  ) {}

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

  @Get('receipt/:userId')
  async getPaymentReceipt(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      console.log(`[DEBUG] Received request for user: ${userId}`);

      // 1. Get payment record
      const payment = await this.paymentService.getPaymentByUserId(userId);
      if (!payment) {
        console.log('[DEBUG] No payment record found');
        return res.status(404).json({ message: 'Payment record not found' });
      }

      if (!payment.screenshot) {
        console.log('[DEBUG] No screenshot in payment record');
        return res.status(404).json({ message: 'No receipt uploaded' });
      }

      // 2. Construct file path
      const filePath = join(
        process.cwd(),
        'uploads',
        'telebirr',
        payment.screenshot,
      );
      console.log(`[DEBUG] Looking for file at: ${filePath}`);

      // 3. Verify file exists
      if (!existsSync(filePath)) {
        console.log('[DEBUG] File not found at path');
        return res
          .status(404)
          .json({ message: 'Receipt file not found on server' });
      }

      // 4. Determine content type
      const extension =
        payment.screenshot?.split('.').pop()?.toLowerCase() ?? '';
      const contentType = this.getContentType(extension);

      // 5. Stream the file
      res.set({
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${payment.screenshot}"`,
      });

      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('[ERROR] in getPaymentReceipt:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  private getContentType(extension: string): string {
    const types = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      pdf: 'application/pdf',
    };
    return types[extension] || 'application/octet-stream';
  }

  @Post('telebirr/upload')
  @UseInterceptors(
    FileInterceptor('screenshot', {
      storage: diskStorage({
        destination: './uploads/telebirr',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
          return cb(new Error('Only image and PDF files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async handleTelebirrUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    if (!body.email) {
      throw new Error('Email is required');
    }

    try {
      const result = await this.paymentService.saveTelebirrScreenshot(
        body.email,
        file.filename,
      );

      return {
        success: true,
        message: 'Screenshot uploaded successfully. Awaiting admin approval.',
        filename: file.filename,
      };
    } catch (error) {
      throw new Error(`Failed to save payment: ${error.message}`);
    }
  }
}
