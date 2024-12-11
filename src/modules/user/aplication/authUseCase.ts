import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../domain/user.repository';
import { SignInDto } from './dtos/signin.dto';
import { UserEntity } from '../domain/user.entity';
import { Payload } from '../../../common/interfaces/auth.interface';
import { AccessRepository } from '../../permission/domain/access.repository';
import { AuthMeResponse } from '../domain/user.value';

@Injectable()
export class AuthUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('AccessRepository')
    private readonly accessRepository: AccessRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isMatch = await this.comparePassword(password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Invalid credentials');
    }

    const accessToken = await this.generateToken(user);
    return { token: accessToken, user };
  }

  public async userAuthenticaded(payload: Payload): Promise<AuthMeResponse> {
    const user = await this.userRepository.findUserById(payload.id);
    if (!user) {
      throw new Error('User not found');
    }

    const access = await this.accessRepository.findByRoleId(payload.roleId);

    return {
      user,
      access,
    };
  }

  private async comparePassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  private async generateToken(user: UserEntity) {
    const payload: Payload = {
      id: user.id,
      email: user.email,
      roleId: user.role.id,
      name: user.name,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
