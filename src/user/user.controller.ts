import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';
import { UserService } from './user.service';
import { UpdateProfileRequest } from './validations';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@GetUser() user: User) {
    const { id, name, email, created_at } = user;

    return {
      id,
      name,
      email,
      created_at,
    };
  }

  @Patch('profile')
  updateProfile(@GetUser('id') id: number, @Body() data: UpdateProfileRequest) {
    return this.userService.updateProfile(id, data);
  }
}
