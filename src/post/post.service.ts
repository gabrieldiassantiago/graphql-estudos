import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from 'generated/prisma';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(title: string, authorId: string): Promise<Post> {
    return this.prisma.post.create({
      data: { title, authorId },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async delete(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
