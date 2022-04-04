import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginRequest, RegistrationRequest } from './validations';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Header('Cache-Control', 'none')
  register(@Body() data: RegistrationRequest) {
    return this.authService.register(data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  login(@Body() data: LoginRequest) {
    return this.authService.login(data);
  }
}
