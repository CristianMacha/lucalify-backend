import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from './user.schema';
import { UserRepository } from '../domain/user.repository';
import { UserValue } from '../domain/user.value';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserMysqlRepository
  extends Repository<User>
  implements UserRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async registerUser(userValue: UserValue): Promise<UserValue | null> {
    const userCreated = this.create(userValue);
    const userSaved = await this.save(userCreated);
    return plainToInstance(UserValue, userSaved);
  }

  async listUser(): Promise<UserValue[]> {
    const users = await this.find();
    return users.map((user) => plainToInstance(UserValue, user));
  }

  async findUserById(id: string): Promise<UserValue | null> {
    const user = await this.findOne({ where: { id } });
    if (!user) return null;
    return plainToInstance(UserValue, user);
  }

  async findByEmail(email: string): Promise<UserValue | null> {
    const user = await this.findOne({ where: { email }, relations: ['role'] });
    if (!user) return null;
    return plainToInstance(UserValue, user);
  }
}
