import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateRolePermissionDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  readonly roleId: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  readonly permissionId: string;
}
