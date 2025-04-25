// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { UserModule } from '../user/user.module'; // Import the UserModule
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    UserModule, // Add UserModule to imports
    HttpModule, // Import HttpModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService], // Export PaymentService if needed in other modules
})
export class PaymentModule {}
