import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class MembershipTask {
  private readonly logger = new Logger(MembershipTask.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleMembershipExpiration() {
    this.logger.log('Running membership expiration check...');
    
    const now = new Date();
    const expiredUsers = await this.userModel.find({
      membershipExpires: { $lte: now },
      hasPaid: true
    });

    if (expiredUsers.length > 0) {
      this.logger.log(`Found ${expiredUsers.length} expired memberships`);
      
      const bulkOps = expiredUsers.map(user => ({
        updateOne: {
          filter: { _id: user._id },
          update: {
            $set: {
              hasPaid: false,
              status: 'pending' // or 'expired' if you prefer
            }
          }
        }
      }));

      await this.userModel.bulkWrite(bulkOps);
      this.logger.log('Updated expired memberships');
    } else {
      this.logger.log('No expired memberships found');
    }
  }
}