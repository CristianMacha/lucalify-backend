import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Client } from './client.schema';

@Entity({ name: 'type_documents' })
export class TypeDocument {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @OneToMany(() => Client, (client) => client.typeDocument)
  clients: Client[];
}
