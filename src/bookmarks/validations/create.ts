import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBookmarkDTO {
  @IsString({ message: 'Title contains invalid characters!' })
  @IsNotEmpty({ message: 'Title is required!' })
  title: string;

  @IsString({ message: 'Description contains invalid characters' })
  @IsOptional()
  description?: string;

  @IsString({ message: 'Link contains invalid characters!' })
  @IsNotEmpty({ message: 'Link is required!' })
  @IsUrl(undefined, { message: 'An invalid link URL was provided!' })
  link: string;
}
