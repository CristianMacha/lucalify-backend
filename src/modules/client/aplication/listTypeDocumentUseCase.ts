import { Inject, Injectable } from '@nestjs/common';
import { TypeDocumentRepository } from '../domain/type-document.repository';

@Injectable()
export class ListTypeDocumentUseCase {
  constructor(
    @Inject('TypeDocumentRepository')
    private readonly typeDocumentRepository: TypeDocumentRepository,
  ) {}

  public async execute() {
    return await this.typeDocumentRepository.list();
  }
}
