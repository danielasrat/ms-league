// src/tv-show/tv-show.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TvShow, TvShowSchema } from './schemas/tv-show.schema';
import { TvShowController } from './tv-show.controller';
import { TvShowService } from './tv-show.service';
import { JwtCustomModule } from '../auth/jwt.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: TvShow.name, schema: TvShowSchema }]),
    JwtCustomModule,
  ],
  controllers: [TvShowController],
  providers: [TvShowService],
})
export class TvShowModule {}

