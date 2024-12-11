import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRoleAccessDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly roleId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly accessId: string;
}
