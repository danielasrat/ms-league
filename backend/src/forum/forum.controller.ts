import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { ForumService } from './forum.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CreatePostDto } from './dto/create-post.dto';
  import { UpdatePostDto } from './dto/update-post.dto';
  import { CreateCommentDto } from './dto/create-comment.dto';
  import { UpdateCommentDto } from './dto/update-comment.dto';
  
  @UseGuards(JwtAuthGuard)
  @Controller('forum')
  export class ForumController {
    constructor(private readonly forumService: ForumService) {}
  
    @Post()
    createPost(@Request() req, @Body() dto: CreatePostDto) {
      return this.forumService.createPost(req.user.userId, dto);
    }
  
    @Get()
    getAllPosts() {
      return this.forumService.getAllPosts();
    }
  
    @Patch(':id')
    updatePost(@Param('id') id: string, @Request() req, @Body() dto: UpdatePostDto) {
      return this.forumService.updatePost(id, req.user.userId, dto);
    }
  
    @Delete(':id')
    deletePost(@Param('id') id: string, @Request() req) {
      return this.forumService.deletePost(id, req.user.userId);
    }
  
    @Post(':id/like')
    toggleLike(@Param('id') id: string, @Request() req) {
      return this.forumService.toggleLike(id, req.user.userId);
    }
  
    @Post(':id/comment')
    addComment(@Param('id') id: string, @Request() req, @Body() dto: CreateCommentDto) {
      return this.forumService.addComment(id, req.user.userId, dto);
    }
  
    @Patch('comment/:id')
    updateComment(@Param('id') id: string, @Request() req, @Body() dto: UpdateCommentDto) {
      return this.forumService.updateComment(id, req.user.userId, dto);
    }
  
    @Delete('comment/:id')
    deleteComment(@Param('id') id: string, @Request() req) {
      return this.forumService.deleteComment(id, req.user.userId);
    }
  }
  
