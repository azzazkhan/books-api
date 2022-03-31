import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { registrationRequest } from './validations';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() req: registrationRequest) {
    console.log(req);
    return req;
  }

  @Post('login')
  login() {
    return 'The user is now logged in';
  }
}
