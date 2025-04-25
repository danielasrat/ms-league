import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  profileImage?: string;

  @Prop({ default: 'pending' }) // 'pending', 'approved', 'rejected'
  status: string;

  @Prop({ default: false })
  hasPaid: boolean;

  @Prop()
  paymentDate?: Date;

  @Prop()
  membershipExpires?: Date;

  @Prop({ default: 0 })
  daysLeft?: number;

  @Prop()
  paymentMethod?: string;

  @Prop({ default: 'pending' })
  paymentStatus: string;

  @Prop()
  lastUpdated?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
