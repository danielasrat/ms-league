import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createPost(userId: string, dto: CreatePostDto) {
    const post = await this.postModel.create({
      content: dto.content,
      author: userId,
    });
    return post;
  }

  async getAllPosts() {
    return this.postModel
      .find()
      .populate('author', 'name')
      .populate({ path: 'comments', populate: { path: 'author', select: 'name' } })
      .sort({ createdAt: -1 });
  }

  async updatePost(id: string, userId: string, dto: UpdatePostDto) {
    const post = await this.postModel.findById(id);
    if (!post || post.author.toString() !== userId) {
      throw new NotFoundException('Post not found or access denied');
    }
    post.content = dto.content;
    return post.save();
  }

  async deletePost(id: string, userId: string) {
    const post = await this.postModel.findById(id);
    if (!post || post.author.toString() !== userId) {
      throw new NotFoundException('Post not found or access denied');
    }
    await this.commentModel.deleteMany({ post: post._id });
    return post.deleteOne();
  }

  async toggleLike(postId: string, userId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const liked = post.likes.includes(userId as unknown as Types.ObjectId);
    if (liked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId as unknown as Types.ObjectId);
    }
    return post.save();
  }

  async addComment(postId: string, userId: string, dto: CreateCommentDto) {
    const comment = await this.commentModel.create({
      content: dto.content,
      author: userId,
      post: postId,
    });
    await this.postModel.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });
    return comment;
  }

  async updateComment(id: string, userId: string, dto: UpdateCommentDto) {
    const comment = await this.commentModel.findById(id);
    if (!comment || comment.author.toString() !== userId) {
      throw new NotFoundException('Comment not found or access denied');
    }
    comment.content = dto.content;
    return comment.save();
  }

  async deleteComment(id: string, userId: string) {
    const comment = await this.commentModel.findById(id);
    if (!comment || comment.author.toString() !== userId) {
      throw new NotFoundException('Comment not found or access denied');
    }
    await this.postModel.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id },
    });
    return comment.deleteOne();
  }
}

