import { Inject, Injectable } from '@nestjs/common';
import { TypeDocumentRepository } from '../domain/type-document.repository';
import { UpdateTypeDocumentDto } from './dto/update-type-document.dto';

@Injectable()
export class UpdateTypeDocumentUseCase {
  constructor(
    @Inject('TypeDocumentRepository')
    private readonly typeDocumentRepository: TypeDocumentRepository,
  ) {}

  public async execute(
    id: string,
    updateTypeDocumentDto: UpdateTypeDocumentDto,
  ) {
    const { name, code, isActive } = updateTypeDocumentDto;
    const typeDocument = await this.getTypeDocumentById(id);
    if (!typeDocument) {
      throw new Error('Type Document not found');
    }

    typeDocument.name = name;
    typeDocument.code = code;
    typeDocument.isActive = isActive;
    typeDocument.updatedAt = new Date();
    return await this.typeDocumentRepository.updateTypeDocument(typeDocument);
  }

  private async getTypeDocumentById(id: string) {
    return await this.typeDocumentRepository.findById(id);
  }
}
