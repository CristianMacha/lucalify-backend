import { Inject, Injectable } from '@nestjs/common';
import { TypeDocumentRepository } from '../domain/type-document.repository';
import { CreateTypeDocumentDto } from './dto/create-type-document.dto';
import { TypeDocumentValue } from '../domain/type-document.value';

@Injectable()
export class RegisterTypeDocumentUseCase {
  constructor(
    @Inject('TypeDocumentRepository')
    private readonly typeDocumentRepository: TypeDocumentRepository,
  ) {}

  public async execute(createTypeDocument: CreateTypeDocumentDto) {
    const { name, isActive } = createTypeDocument;

    const newTypeDocument = new TypeDocumentValue(name, isActive);
    const typeDocumentCreated =
      await this.typeDocumentRepository.register(newTypeDocument);
    return typeDocumentCreated;
  }
}
