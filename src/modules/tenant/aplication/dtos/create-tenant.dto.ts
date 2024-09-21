import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsString()
  readonly ruc: string;
}
