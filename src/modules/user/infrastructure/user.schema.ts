import { Role } from '../../role/infrastructure/role.schema';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ nullable: false })
  deleted: boolean;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
