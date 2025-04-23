import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventRegistration } from './schemas/event-registration.schema';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event-registration.dto';
import { Event } from '../event/schemas/event.schema';
import { User } from '../user/schemas/user.schema';
import { MailService } from '../mail/mail.service';

@Injectable()
export class EventRegistrationService {
  constructor(
    @InjectModel(EventRegistration.name) private registrationModel: Model<EventRegistration>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(User.name) private userModel: Model<User>,
    private mailService: MailService
  ) {}

  async registerForEvent(dto: CreateEventRegistrationDto) {
    const [user, event] = await Promise.all([
      this.userModel.findById(dto.userId),
      this.eventModel.findById(dto.eventId)
    ]);

    if (!user || !event) {
      throw new NotFoundException('User or Event not found');
    }

    const existingRegistration = await this.registrationModel.findOne({
      user: dto.userId,
      event: dto.eventId
    });

    if (existingRegistration) {
      throw new Error('User already registered for this event');
    }

    const registration = new this.registrationModel({
      user: dto.userId,
      event: dto.eventId,
      status: 'pending'
    });

    return registration.save();
  }

  async updateRegistration(id: string, dto: UpdateEventRegistrationDto) {
    const registration = await this.registrationModel.findByIdAndUpdate(
      id,
      { 
        status: dto.status,
        approvedAt: dto.status === 'approved' ? new Date() : undefined 
      },
      { new: true }
    ).populate('user event');

    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    // Send appropriate email
    if (dto.status === 'approved') {
      await this.mailService.sendEventApprovalEmail(
        registration.user.email,
        registration.event.title
      );
    } else {
      await this.mailService.sendEventRejectionEmail(
        registration.user.email,
        registration.event.title
      );
    }

    return registration;
  }

  async getRegistrationsByEvent(eventId: string) {
    return this.registrationModel.find({ event: eventId })
      .populate('user', 'name email phone')
      .populate('event', 'title date');
  }

  async getUserRegistrations(userId: string) {
    return this.registrationModel.find({ user: userId })
      .populate('event', 'title date description imageLink');
  }

  async getRegistrationsByStatus(status: string) {
    return this.registrationModel.find({ status })
      .populate('user', 'name email phone')
      .populate('event', 'title date');
  }

  async categorizeRegistrations() {
    const now = new Date();
    
    const pastEvents = await this.eventModel.find({ date: { $lt: now } });
    const currentEvents = await this.eventModel.find({ 
      date: { 
        $gte: new Date(now.setHours(0, 0, 0, 0)),
        $lt: new Date(now.setHours(23, 59, 59, 999))
      }
    });
    const futureEvents = await this.eventModel.find({ date: { $gt: now } });

    return {
      past: await this.registrationModel.find({ 
        event: { $in: pastEvents.map(e => e._id) }
      }).populate('user event'),
      happening: await this.registrationModel.find({ 
        event: { $in: currentEvents.map(e => e._id) }
      }).populate('user event'),
      upcoming: await this.registrationModel.find({ 
        event: { $in: futureEvents.map(e => e._id) }
      }).populate('user event')
    };
  }
}
