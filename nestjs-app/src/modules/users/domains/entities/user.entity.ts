import { Role } from '../../../../../src/constants/role.constant';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER, nullable: false })
  role: Role;
}
