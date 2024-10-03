import { Inject, Injectable } from '@nestjs/common';
import { IdentityRepository } from '../domain/identity.repository';

@Injectable()
export class GetIdentityByRucUseCase {
  constructor(
    @Inject('IdentityRepository')
    private readonly identityRepository: IdentityRepository,
  ) {}

  async execute(ruc: string) {
    return this.identityRepository.getByRuc(ruc);
  }
}
