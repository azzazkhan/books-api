import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginValidator {
  @IsEmail(undefined, { message: 'An invalid email was provided!' })
  @IsNotEmpty({ message: 'Email is required!' })
  email: string;

  @IsString({ message: 'Invalid password provided!' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}

export default LoginValidator;
