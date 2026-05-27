import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(data: Partial<Post>) {
    const post = this.postsRepository.create(data);

    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find({
    relations: {
            author: true,
},
    });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
    author: true,
    },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: number, data: Partial<Post>) {
    await this.findOne(id);

    await this.postsRepository.update(id, data);

    return this.findOne(id);
  }

  async remove(id: number) {
    const post = await this.findOne(id);

    await this.postsRepository.remove(post);

    return {
      message: 'Post deleted',
    };
  }
}