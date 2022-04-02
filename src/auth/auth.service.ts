import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { loginRequest, registrationRequest } from './validations';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

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
      if (error instanceof PrismaClientKnownRequestError) {
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

    const { id, name, created_at } = user;

    return {
      token: await this.generateToken(id, email),
      user: {
        id,
        name,
        email,
        created_at,
      },
    };
  }

  generateToken(id: number, email: string) {
    return this.jwt.signAsync(
      { sub: id, email },
      { expiresIn: '30 minutes', secret: this.config.get('TOKEN_SECRET') },
    );
  }
}
