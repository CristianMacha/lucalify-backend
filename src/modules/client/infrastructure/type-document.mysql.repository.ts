import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TypeDocument } from './type-document.schema';
import { TypeDocumentRepository } from '../domain/type-document.repository';
import { TypeDocumentValue } from '../domain/type-document.value';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TypeDocumentMysqlRepository
  extends Repository<TypeDocument>
  implements TypeDocumentRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(TypeDocument, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<TypeDocumentValue> {
    const typeDocument = await this.findOne({ where: { id } });
    return plainToInstance(TypeDocumentValue, typeDocument);
  }

  async register(typeDocument: TypeDocumentValue): Promise<TypeDocumentValue> {
    const typeDocumentCreated = await this.save(typeDocument);
    return plainToInstance(TypeDocumentValue, typeDocumentCreated);
  }

  async list(): Promise<TypeDocumentValue[]> {
    const typeDocuments = await this.find();
    return typeDocuments.map((typeDocument) =>
      plainToInstance(TypeDocumentValue, typeDocument),
    );
  }
}
