import { Inject, Injectable } from '@nestjs/common';
import { ClientMysqlRepository } from '../infrastructure/client.mysq.repository';

@Injectable()
export class SearchClientUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientMysqlRepository,
  ) {}

  public async execute(value: string) {
    return await this.clientRepository.searchClient(value);
  }
}
