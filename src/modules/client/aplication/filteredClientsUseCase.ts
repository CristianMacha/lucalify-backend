import { Inject, Injectable } from '@nestjs/common';
import { ClientRepository } from '../domain/client.repository';
import { FilterClientDto } from './dto/filter-client.dto';

@Injectable()
export class FilteredClientsUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
  ) {}

  public async execute(filterClient: FilterClientDto) {
    return await this.clientRepository.filteredClients(filterClient);
  }
}
