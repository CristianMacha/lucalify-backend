import { v4 as uuid } from 'uuid';
import { AttributeEntity } from './attribute.entity';
import { AttributevalueValue } from './attribute-value.value';

export class AttributeValue implements AttributeEntity {
  id: string;
  name: string;
  active: boolean;
  deleted: boolean;
  values: AttributevalueValue[];

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
    this.active = true;
    this.deleted = false;
    this.values = [];
  }
}
