import { Inject, Injectable } from '@nestjs/common';
import { ClientRepository } from '../domain/client.repository';
import { TypeDocumentRepository } from '../domain/type-document.repository';
import { UpdateClientDto } from './dto/update-client.dto';
import { Payload } from '../../../common/interfaces/auth.interface';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    @Inject('TypeDocumentRepository')
    private readonly typeDocumentRepository: TypeDocumentRepository,
  ) {}

  public async execute(
    id: string,
    updateClientDto: UpdateClientDto,
    payload: Payload,
  ) {
    const { name, typeDocumentId, documentNumber, email, phone, address } =
      updateClientDto;
    const typeDocument = await this.getTypeDocumentById(typeDocumentId);
    if (!typeDocument) {
      throw new Error('Type Document not found');
    }

    const client = await this.clientRepository.findClientById(id);
    if (!client) {
      throw new Error('Client not found');
    }

    client.name = name;
    client.typeDocument = typeDocument;
    client.documentNumber = documentNumber;
    client.email = email;
    client.phone = phone;
    client.address = address;
    client.updatedBy = payload.name;
    client.updatedAt = new Date();

    const clientUpdated = await this.clientRepository.updateClient(client);
    return clientUpdated;
  }

  private async getTypeDocumentById(typeDocumentId: string) {
    return this.typeDocumentRepository.findById(typeDocumentId);
  }
}
