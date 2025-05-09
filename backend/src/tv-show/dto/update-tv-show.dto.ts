// src/tv-show/dto/update-tv-show.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTvShowDto } from './create-tv-show.dto';

export class UpdateTvShowDto extends PartialType(CreateTvShowDto) {}
