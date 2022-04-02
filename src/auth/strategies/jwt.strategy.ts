import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

declare type Payload = { sub: number; email: string; iat: number; exp: number };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('TOKEN_SECRET'),
    });
  }

  async validate({ sub: id }: Payload) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
