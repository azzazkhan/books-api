import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register() {
    return 'The user is now registered';
  }

  @Post('login')
  login() {
    return 'The user is now logged in';
  }
}
