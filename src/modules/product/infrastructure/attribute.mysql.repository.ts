import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Attribute } from './attribute.schema';
import { AttributeRepository } from '../domain/attribute.repository';
import { plainToInstance } from 'class-transformer';
import { AttributeValue } from '../domain/attribute.value';

@Injectable()
export class AttributeMysqlRepository
  extends Repository<Attribute>
  implements AttributeRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Attribute, dataSource.createEntityManager());
  }

  async registerAttribute(
    attribute: AttributeValue,
  ): Promise<AttributeValue | null> {
    const attributeCreated = this.create(attribute);
    const attributeSaved = await this.save(attributeCreated);
    return plainToInstance(AttributeValue, attributeSaved);
  }

  async findAttributeById(id: string): Promise<AttributeValue | null> {
    const attribute = await this.findOne({ where: { id } });
    if (!attribute) return null;
    return plainToInstance(AttributeValue, attribute);
  }

  async listAttribute(): Promise<AttributeValue[]> {
    const attributes = await this.find();
    return attributes.map((attribute) =>
      plainToInstance(AttributeValue, attribute),
    );
  }
}
