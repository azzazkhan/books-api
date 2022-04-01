import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'auth/guards';
import { GetUser } from 'auth/decorators';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('profile')
  profile(@GetUser() user: User) {
    const { id, name, email, created_at } = user;

    return {
      id,
      name,
      email,
      created_at,
    };
  }
}
