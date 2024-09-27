import { TypeDocumentEntity } from './type-document.entity';

export interface ClientEntity {
  id: string;
  name: string;
  typeDocument: TypeDocumentEntity;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterClient {
  textSearch: string;
  page: number;
  perPage: number;
}
