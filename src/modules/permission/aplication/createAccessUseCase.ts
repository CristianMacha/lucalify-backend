import { Inject, Injectable } from '@nestjs/common';
import { AccessRepository } from '../domain/access.repository';
import { CreateAccessDto } from './dtos/create-access.dto';
import { AccessValue } from '../domain/access.value';

@Injectable()
export class CreateAccessUseCase {
  constructor(
    @Inject('AccessRepository')
    private readonly accessRepository: AccessRepository,
  ) {}

  public async execute(createAccessDto: CreateAccessDto) {
    const { name, path } = createAccessDto;
    const newAccess = new AccessValue(name, path);
    return await this.accessRepository.register(newAccess);
  }
}
