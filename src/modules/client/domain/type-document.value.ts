import { v4 as uuid } from 'uuid';
import { TypeDocumentEntity } from './type-document.entity';

export class TypeDocumentValue implements TypeDocumentEntity {
  id: string;
  name: string;
  isActive: boolean;
  code: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, isActive: boolean, code: string) {
    this.id = uuid();
    this.name = name;
    this.code = code;
    this.isActive = isActive;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
