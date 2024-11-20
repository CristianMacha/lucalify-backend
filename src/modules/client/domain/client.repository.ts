import { ResponseList } from '../../../common/interfaces/response.interface';
import { FilterClient } from './client.entity';
import { ClientValue } from './client.value';

export interface ClientRepository {
  findClientById(id: string): Promise<ClientValue | null>;
  register(client: ClientValue): Promise<ClientValue | null>;
  list(): Promise<ClientValue[]>;
  filteredClients(filter: FilterClient): Promise<ResponseList<ClientValue>>;
  updateClient(client: ClientValue): Promise<ClientValue | null>;
  searchClient(value: string): Promise<ClientValue[]>;
}
