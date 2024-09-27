import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  readonly typeDocumentId: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  @IsNotEmpty()
  readonly documentNumber: string;

  @ApiProperty({ example: 'john@test.com' })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  @IsOptional()
  readonly phone: string;

  @ApiProperty({ example: 'Calle 123' })
  @IsString()
  @IsOptional()
  readonly address: string;
}
