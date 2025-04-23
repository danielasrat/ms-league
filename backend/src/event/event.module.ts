// event.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventSchema } from './schemas/event.schema';
import { JwtCustomModule } from '../auth/jwt.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
JwtCustomModule,
],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}

