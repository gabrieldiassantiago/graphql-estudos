import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './auth.model';
import { UseGuards, Res } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { Response } from 'express';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async register(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.register(name, email, password);
  }
@Mutation(() => String)
async login(
  @Args('email') email: string,
  @Args('password') password: string,
  @Context() context
) {
  const result = await this.authService.login(email, password);

  const res: Response = context.res;

  res.cookie('token', result.access_token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return "ok";
}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@Context() context) {
    const user = context.req.user;
    return this.authService.getProfile(user.sub);
  }
}
