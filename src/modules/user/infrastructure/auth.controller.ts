import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUseCase } from '../aplication/authUseCase';
import { SignInDto } from '../aplication/dtos/signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authUseCase.signIn(signInDto);
  }
}
