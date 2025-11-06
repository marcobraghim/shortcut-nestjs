import { IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {

  @IsString()
  @IsUrl()
  target_url: string
}
