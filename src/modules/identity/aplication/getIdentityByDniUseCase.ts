import { Inject, Injectable } from '@nestjs/common';
import { IdentityRepository } from '../domain/identity.repository';

@Injectable()
export class GetIdentityByDniUseCase {
  constructor(
    @Inject('IdentityRepository')
    private readonly identityRepository: IdentityRepository,
  ) {}

  async execute(dni: string) {
    return this.identityRepository.getByDni(dni);
  }
}
