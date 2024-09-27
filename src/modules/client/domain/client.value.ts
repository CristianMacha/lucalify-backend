import { v4 as uuid } from 'uuid';
import { ClientEntity } from './client.entity';
import { TypeDocumentValue } from './type-document.value';

export class ClientValue implements ClientEntity {
  id: string;
  name: string;
  typeDocument: TypeDocumentValue;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    typeDocument: TypeDocumentValue,
    documentNumber: string,
    email: string,
    phone: string,
    address: string,
    createdBy: string,
    updatedBy: string,
  ) {
    this.id = uuid();
    this.name = name;
    this.typeDocument = typeDocument;
    this.documentNumber = documentNumber;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
