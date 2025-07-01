import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Post } from './post.model';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  async posts() {
    return this.postService.findAll();
  }

  @Mutation(() => Post)
  async createPost(
    @Args('title') title: string,
    @Args('authorId', { type: () => String }) authorId: string,
  ) {
    return this.postService.create(title, authorId);
  }

  @Mutation(() => Post)
  async deletePost(@Args('id', { type: () => String }) id: string) {
    return this.postService.delete(id);
  }
}
