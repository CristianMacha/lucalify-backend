import { v4 as uuid } from 'uuid';
import { AttributeValueEntity } from './attribute-value.entitty';
import { AttributeValue } from './attribute.value';
import { ProductVariantAttributeValue } from './product-variant-attribute.value';

export class AttributevalueValue implements AttributeValueEntity {
  id: string;
  value: string;
  active: boolean;
  deleted: boolean;
  attribute: AttributeValue;
  productVariantAttributes: ProductVariantAttributeValue[];

  constructor(value: string, attribute: AttributeValue) {
    this.id = uuid();
    this.value = value;
    this.active = true;
    this.deleted = false;
    this.attribute = attribute;
  }
}
