// src/tv-show/tv-show.controller.ts
import {
    Controller,Post,Get,Put,Delete,Body,Param,UseGuards,
  } from '@nestjs/common';
  import { TvShowService } from './tv-show.service';
  import { CreateTvShowDto } from './dto/create-tv-show.dto';
  import { UpdateTvShowDto } from './dto/update-tv-show.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('tv-shows')
  export class TvShowController {
    constructor(private readonly service: TvShowService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CreateTvShowDto) {
      return this.service.create(dto);
    }
  
    @Get()
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() dto: UpdateTvShowDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  
    @Post(':id/comment')
    @UseGuards(JwtAuthGuard)
    addComment(@Param('id') id: string, @Body('comment') comment: string) {
      return this.service.addComment(id, comment);
    }
  
    @Post(':id/like')
    @UseGuards(JwtAuthGuard)
    like(@Param('id') id: string) {
      return this.service.like(id);
    }
  }
  
