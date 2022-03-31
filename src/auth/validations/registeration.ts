import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class RegistrationValidator {
  @IsString({ message: 'Invalid characters passed in name!' })
  @IsNotEmpty({ message: 'Name is required!' })
  name: string;

  @IsEmail(undefined, { message: 'An invalid email was provided!' })
  @IsNotEmpty({ message: 'Email is required!' })
  email: string;

  @IsString({ message: 'Password needs to be an alpha-numeric string!' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}

export default RegistrationValidator;
