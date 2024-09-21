import { AttributeValue } from './attribute.value';

export interface AttributeRepository {
  findAttributeById(id: string): Promise<AttributeValue | null>;
  registerAttribute(attribute: AttributeValue): Promise<AttributeValue | null>;
  listAttribute(): Promise<AttributeValue[]>;
}
