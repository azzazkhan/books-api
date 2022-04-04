import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileRequest } from './validations';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  updateProfile(id: number, data: UpdateProfileRequest) {
    const user = this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, created_at: true },
    });

    return user;
  }
}
