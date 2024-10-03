import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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
  readonly documentNumber: string;

  @ApiProperty({ example: 'john@test.com', nullable: true })
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
