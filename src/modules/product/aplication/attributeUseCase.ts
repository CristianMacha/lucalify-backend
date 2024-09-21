import { Inject, Injectable } from '@nestjs/common';

import { AttributeRepository } from '../domain/attribute.repository';
import { createAttributeDto } from './dtos/create-attribute.dto';
import { AttributeValue } from '../domain/attribute.value';

@Injectable()
export class AttributeUseCase {
  constructor(
    @Inject('AttributeRepository')
    private readonly attributeRepository: AttributeRepository,
  ) {}

  public async registerAttribute(createAttributeDto: createAttributeDto) {
    const { name } = createAttributeDto;
    const newAttribute = new AttributeValue(name);
    const attributeCreated =
      await this.attributeRepository.registerAttribute(newAttribute);
    return attributeCreated;
  }

  public async listAttribute() {
    return await this.attributeRepository.listAttribute();
  }
}
