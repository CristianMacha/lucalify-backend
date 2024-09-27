import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ default: 'admin@test.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'admin' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
