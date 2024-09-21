import { AttributevalueValue } from './attribute-value.value';

export interface AttributeValueRepository {
  findAttributeValueById(id: string): Promise<AttributevalueValue | null>;
  registerAttributeValue(
    attributeValue: AttributevalueValue,
  ): Promise<AttributevalueValue | null>;
  listAttributeValue(): Promise<AttributevalueValue[]>;
}
