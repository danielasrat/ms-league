import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Event } from '../../event/schemas/event.schema';
import { User } from '../../user/schemas/user.schema';

export type EventRegistrationDocument = EventRegistration & Document;

@Schema({ timestamps: true })
export class EventRegistration {
  @Prop({ required: true, type: 'ObjectId', ref: 'User' })
  user: User;

  @Prop({ required: true, type: 'ObjectId', ref: 'Event' })
  event: Event;

  @Prop({ default: 'pending' })
  status: string; // 'pending', 'approved', 'rejected'

  @Prop()
  approvedAt?: Date;
}

export const EventRegistrationSchema = SchemaFactory.createForClass(EventRegistration);