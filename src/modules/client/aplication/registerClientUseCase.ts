import { Inject, Injectable } from '@nestjs/common';
import { ClientRepository } from '../domain/client.repository';
import { TypeDocumentRepository } from '../domain/type-document.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { Payload } from '../../../common/interfaces/auth.interface';
import { ClientValue } from '../domain/client.value';

@Injectable()
export class RegisterClientUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    @Inject('TypeDocumentRepository')
    private readonly typeDocumentRepository: TypeDocumentRepository,
  ) {}

  public async execute(createClientDto: CreateClientDto, payload: Payload) {
    const { name, typeDocumentId, documentNumber, email, phone, address } =
      createClientDto;
    const typeDocument = await this.getTypeDocumentById(typeDocumentId);
    if (!typeDocument) {
      throw new Error('Type Document not found');
    }

    const newClient = new ClientValue(
      name,
      typeDocument,
      documentNumber,
      email,
      phone,
      address,
      payload.name,
      payload.name,
    );
    const clientCreated = await this.clientRepository.register(newClient);
    return clientCreated;
  }

  private getTypeDocumentById(typeDocumentId: string) {
    return this.typeDocumentRepository.findById(typeDocumentId);
  }
}
