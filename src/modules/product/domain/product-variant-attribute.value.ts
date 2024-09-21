import { AttributevalueValue } from './attribute-value.value';
import { ProductVariantAttributeEntity } from './product-variant-attribute.entity';
import { ProductVariantValue } from './product-variant.value';

export class ProductVariantAttributeValue
  implements ProductVariantAttributeEntity
{
  productVariantId: string;
  attributeValueId: string;
  productVariant: ProductVariantValue;
  attributeValue: AttributevalueValue;

  constructor(
    productVariant: ProductVariantValue,
    attributeValue: AttributevalueValue,
  ) {
    this.productVariantId = productVariant.id;
    this.attributeValueId = attributeValue.id;
    this.productVariant = productVariant;
    this.attributeValue = attributeValue;
  }
}
