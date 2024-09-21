import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AttributeValue } from './attribute-value.schema';
import { AttributeValueRepository } from '../domain/attribute-value.repository';
import { AttributevalueValue } from '../domain/attribute-value.value';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AttributeValueMysqlRepository
  extends Repository<AttributeValue>
  implements AttributeValueRepository
{
  async registerAttributeValue(
    attributeValue: AttributevalueValue,
  ): Promise<AttributevalueValue | null> {
    const attributeValueCreated = this.create(attributeValue);
    const attributeValueSaved = await this.save(attributeValueCreated);
    return plainToInstance(AttributevalueValue, attributeValueSaved);
  }

  async findAttributeValueById(
    id: string,
  ): Promise<AttributevalueValue | null> {
    const attributeValue = await this.findOne({ where: { id } });
    if (!attributeValue) return null;
    return plainToInstance(AttributevalueValue, attributeValue);
  }

  async listAttributeValue(): Promise<AttributevalueValue[]> {
    const attributeValues = await this.find();
    return attributeValues.map((attributeValue) =>
      plainToInstance(AttributevalueValue, attributeValue),
    );
  }
}
