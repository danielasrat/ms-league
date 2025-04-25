// src/payment/schemas/payment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  method: string; // 'chapa' or 'telebirr'

  @Prop()
  screenshot?: string;

  @Prop({ default: 'pending' })
  status: string; // 'pending' | 'approved' | 'rejected'
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
