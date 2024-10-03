import { TypeDocumentValue } from './type-document.value';

export interface TypeDocumentRepository {
  findById(id: string): Promise<TypeDocumentValue | null>;
  register(typeDocument: TypeDocumentValue): Promise<TypeDocumentValue | null>;
  list(): Promise<TypeDocumentValue[]>;
  updateTypeDocument(
    typeDocument: TypeDocumentValue,
  ): Promise<TypeDocumentValue | null>;
}
