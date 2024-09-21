import { Inject, Injectable } from '@nestjs/common';
import { AttributeValueRepository } from '../domain/attribute-value.repository';
import { AttributeRepository } from '../domain/attribute.repository';
import { AttributevalueValue } from '../domain/attribute-value.value';

@Injectable()
export class AttributeValueUseCase {
  constructor(
    @Inject('AttributeRepository')
    private readonly attributeRepository: AttributeRepository,
    @Inject('AttributeValueRepository')
    private readonly attributeValueRepository: AttributeValueRepository,
  ) {}

  public async registerAttributeValue(createAttributeValueDto: any) {
    const { value, attributeId } = createAttributeValueDto;
    const attribute =
      await this.attributeRepository.findAttributeById(attributeId);
    if (!attribute) {
      throw new Error('Attribute not found');
    }

    const newAttributeValue = new AttributevalueValue(value, attribute);
    const attributeValueCreated =
      await this.attributeValueRepository.registerAttributeValue(
        newAttributeValue,
      );
    return attributeValueCreated;
  }

  public async listAttributeValue() {
    return await this.attributeValueRepository.listAttributeValue();
  }
}
