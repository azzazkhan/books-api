import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { loginRequest, registrationRequest } from './validations';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() data: registrationRequest) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: loginRequest) {
    return this.authService.login(data);
  }
}
