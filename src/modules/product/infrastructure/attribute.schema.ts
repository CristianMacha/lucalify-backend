import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AttributeValue } from './attribute-value.schema';

@Entity({ name: 'attributes' })
export class Attribute {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  deleted: boolean;

  @OneToMany(() => AttributeValue, (value) => value.attribute)
  values: AttributeValue[];
}
