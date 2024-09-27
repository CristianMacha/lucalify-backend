import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TypeDocument } from './type-document.schema';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  documentNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => TypeDocument, (typeDocument) => typeDocument.clients)
  typeDocument: TypeDocument;
}
