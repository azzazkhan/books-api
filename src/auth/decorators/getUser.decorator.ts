import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as LocalUser, User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as LocalUser;

    // If a single property is requested then provide it else provide the
    // entire user record
    return data ? user[data] : user;
  },
);
