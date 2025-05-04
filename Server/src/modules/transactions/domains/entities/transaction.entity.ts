import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionType } from '../../../../constants/transaction-types.constant';
import { AccountEntity } from '../../../accounts/domains/entities/account.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  type: TransactionType;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => AccountEntity, (account) => account.transaction, {
    cascade: true,
  })
  account: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.transaction, {
    onUpdate: 'CASCADE',
  })
  relatedAccount: AccountEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date;
}
