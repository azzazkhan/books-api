import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { registrationRequest } from './validations';
import { User } from '@prisma/client';
import { hash } from 'argon2';

interface Service {
  register: (request: registrationRequest) => Promise<User>;
}

@Injectable()
export class AuthService implements Service {
  constructor(private prisma: PrismaService) {}

  async register(request: registrationRequest) {
    const password = await hash(request.password);
    const user = this.prisma.user.create({
      data: {
        name: '',
        email: request.email,
        password,
      },
    });

    return user;
  }
}
