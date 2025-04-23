// src/tv-show/tv-show.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TvShow } from './schemas/tv-show.schema';
import { CreateTvShowDto } from './dto/create-tv-show.dto';
import { UpdateTvShowDto } from './dto/update-tv-show.dto';

@Injectable()
export class TvShowService {
  constructor(@InjectModel(TvShow.name) private model: Model<TvShow>) {}

  async create(dto: CreateTvShowDto): Promise<TvShow> {
    return this.model.create({ ...dto });
  }

  async findAll(): Promise<TvShow[]> {
    return this.model.find().sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<TvShow> {
    const show = await this.model.findById(id);
    if (!show) throw new NotFoundException('TV show not found');
    return show;
  }

  async update(id: string, dto: UpdateTvShowDto): Promise<TvShow> {
    const show = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!show) throw new NotFoundException('TV show not found');
    return show;
  }

  async remove(id: string): Promise<void> {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('TV show not found');
  }

  async addComment(id: string, comment: string) {
    return this.model.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true }
    );
  }

  async like(id: string) {
    return this.model.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
  }
}

