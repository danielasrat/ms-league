// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { MembershipTask } from './membership.task';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [MembershipTask],
})
export class TasksModule {}
