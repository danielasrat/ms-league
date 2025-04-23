// src/tv-show/dto/create-tv-show.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateTvShowDto {
  @IsString()
  videoLink: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
