import { IsEmail, IsOptional, IsString } from 'class-validator';

class UpdateProfileValidator {
  @IsString({ message: 'Invalid characters passed in name!' })
  @IsOptional()
  name?: string;

  @IsEmail(undefined, { message: 'An invalid email was provided!' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Password needs to be an alpha-numeric string!' })
  @IsOptional()
  password?: string;
}

export default UpdateProfileValidator;
