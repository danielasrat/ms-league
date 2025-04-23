// src/tv-show/tv-show.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TvShow extends Document {
  @Prop({ required: true })
  videoLink: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  comments: string[];

  @Prop({ default: 0 })
  likes: number;
}

export const TvShowSchema = SchemaFactory.createForClass(TvShow);
