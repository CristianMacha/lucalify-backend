import { Inject, Injectable } from '@nestjs/common';
import { AccessRepository } from '../domain/access.repository';

@Injectable()
export class FindAccessByRoleUseCase {
  constructor(
    @Inject('AccessRepository')
    private readonly accessRepository: AccessRepository,
  ) {}

  public async execute(roleId: string) {
    return await this.accessRepository.findByRoleId(roleId);
  }
}
