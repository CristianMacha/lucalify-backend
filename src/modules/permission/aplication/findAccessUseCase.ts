import { Inject, Injectable } from '@nestjs/common';
import { AccessRepository } from '../domain/access.repository';

@Injectable()
export class FindAccessUseCase {
  constructor(
    @Inject('AccessRepository')
    private readonly accessRepository: AccessRepository,
  ) {}

  public async execute() {
    return await this.accessRepository.list();
  }
}
