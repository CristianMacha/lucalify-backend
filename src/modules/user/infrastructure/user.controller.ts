import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserUseCase } from '../aplication/userUseCase';
import { CreateUserDto } from '../aplication/dtos/create-user.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get()
  async listUser() {
    return await this.userUseCase.listUser();
  }

  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userUseCase.createUser(createUserDto);
  }
}
