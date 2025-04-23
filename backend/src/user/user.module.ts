import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtCustomModule } from '../auth/jwt.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtCustomModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Optional: in case you need to use UserService elsewhere
})
export class UserModule {}

