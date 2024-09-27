import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUseCase } from '../aplication/authUseCase';
import { SignInDto } from '../aplication/dtos/signin.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authUseCase.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() request: any) {
    return await this.authUseCase.userAuthenticaded(request.user);
  }
}
