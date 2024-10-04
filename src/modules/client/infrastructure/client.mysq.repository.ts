import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';

import { Client } from './client.schema';
import { ClientRepository } from '../domain/client.repository';
import { ClientValue } from '../domain/client.value';
import { FilterClient } from '../domain/client.entity';
import { ResponseList } from '../../../common/interfaces/response.interface';

@Injectable()
export class ClientMysqlRepository
  extends Repository<Client>
  implements ClientRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }
  async findClientById(id: string): Promise<ClientValue> {
    return await this.findOne({ where: { id } });
  }

  async register(client: ClientValue): Promise<ClientValue> {
    return await this.save(client);
  }

  async list(): Promise<ClientValue[]> {
    return await this.find();
  }

  async filteredClients(
    filter: FilterClient,
  ): Promise<ResponseList<ClientValue>> {
    const { textSearch, page, perPage } = filter;
    const query = this.createQueryBuilder('client');
    query.innerJoinAndSelect('client.typeDocument', 'typeDocument');
    if (textSearch) {
      query.where(
        'client.name LIKE :textSearch OR client.documentNumber LIKE :textSearch OR client.email LIKE :textSearch',
        { textSearch: `%${textSearch}%` },
      );
    }

    query.orderBy('client.updatedAt', 'DESC');
    query.skip((page - 1) * perPage).take(perPage);

    const totalItems = await query.getCount();
    const totalPages = Math.ceil(totalItems / perPage);
    const clients = await query.getMany();

    return {
      data: clients.map((client) => plainToInstance(ClientValue, client)),
      totalItems,
      totalPages,
      currentPage: page,
      perPage,
    };
  }

  async updateClient(client: ClientValue): Promise<ClientValue> {
    const clientUpdated = await this.save(client);
    return plainToInstance(ClientValue, clientUpdated);
  }
}
