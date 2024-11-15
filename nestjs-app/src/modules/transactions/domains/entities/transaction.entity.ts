import {
  Column,
  CreateDateColumn,
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

  @ManyToOne(() => AccountEntity, (account) => account.transaction)
  account: AccountEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
