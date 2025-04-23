import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRegistrationService } from './event-registration.service';
import { EventRegistrationController } from './event-registration.controller';
import { EventRegistration, EventRegistrationSchema } from './schemas/event-registration.schema';
import { Event, EventSchema } from '../event/schemas/event.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { JwtCustomModule } from '../auth/jwt.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventRegistration.name, schema: EventRegistrationSchema },
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MailModule, 
    JwtCustomModule, 
  ],
  controllers: [EventRegistrationController],
  providers: [EventRegistrationService],
  exports: [EventRegistrationService],
})
export class EventRegistrationModule {}
