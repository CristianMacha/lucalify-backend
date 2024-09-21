import { Inject, Injectable } from '@nestjs/common';
import { UserValue } from '../domain/user.value';
import { UserRepository } from '../domain/user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { RoleRepository } from '../../role/domain/role.repository';

@Injectable()
export class UserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepository,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const { name, email, password, roleId } = createUserDto;
    const role = await this.roleRepository.findRoleById(roleId);
    const newUser = await UserValue.create(name, email, password, role);
    const userCreated = await this.userRepository.registerUser(newUser);
    return userCreated;
  }

  public async listUser() {
    return await this.userRepository.listUser();
  }
}
