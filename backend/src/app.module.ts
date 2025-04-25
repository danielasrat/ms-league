import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { CourseModule } from './course/course.module';
import { EventModule } from './event/event.module';
import { TvShowModule } from './tv-show/tv-show.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { ForumModule } from './forum/forum.module';
import { MembershipTask } from './tasks/membership.task';
import { TasksModule } from './tasks/tasks.module';
import { EventRegistrationModule } from './event-registration/event-registration.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ms-league3'),
    AdminModule,
    CourseModule,
    EventModule,
    TvShowModule,
    UserModule,
    MailModule,
    ForumModule,
    TasksModule,
    EventRegistrationModule,
    PaymentModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
