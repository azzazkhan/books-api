import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginRequest, registrationRequest } from './validations';
import { hash, verify } from 'argon2';
import { PrismaError } from 'types/Prisma';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register({ name, email, ...request }: registrationRequest) {
    try {
      const password = await hash(request.password);
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password,
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.code === 'P2002')
          throw new ForbiddenException(
            'Email already linked to another account!',
          );
      }

      throw error;
    }
  }

  async login({ email, password }: loginRequest) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    // The user does not exists
    if (!user) throw new ForbiddenException('Invalid email or password!');

    // Password did not matched
    if (!(await verify(user.password, password)))
      throw new ForbiddenException('Invalid email or password!');

    return user;
  }
}
