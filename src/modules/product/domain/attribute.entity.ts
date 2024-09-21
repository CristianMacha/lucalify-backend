import { AttributeValueEntity } from './attribute-value.entitty';

export interface AttributeEntity {
  id: string;
  name: string;
  active: boolean;
  deleted: boolean;
  values: AttributeValueEntity[];
}
