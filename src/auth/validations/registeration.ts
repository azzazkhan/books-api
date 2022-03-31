import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

interface Request {
  email: string;
  password: string;
}

class RegistrationValidator implements Request {
  @IsEmail(undefined, { message: 'An invalid email was provided!' })
  @IsNotEmpty({ message: 'Email is required!' })
  email: string;

  @IsString({ message: 'Password needs to be an alpha-numeric string!' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}

export default RegistrationValidator;
