import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => String)
  id: string;

  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  likes?: number;

  @Field({ nullable: true })
  comments?: string;

  @Field(() => String)
  authorId: string;
}
