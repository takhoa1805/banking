import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountStatus } from '../../../../constants/account-status.constant';
import { UserEntity } from '../../../users/domains/entities/user.entity';
import { TransactionEntity } from '../../../transactions/domains/entities/transaction.entity';
import { LoanEntity } from '../../../loans/domains/entities/loan.entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  accountNumber: string;

  @Column({ nullable: false })
  currentBalance: number;

  @Column({ nullable: false })
  status: AccountStatus;

  @ManyToOne(() => UserEntity, (user) => user.account)
  user: UserEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transaction: TransactionEntity[];

  @OneToMany(() => LoanEntity, (loan) => loan.account)
  loan: LoanEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ nullable: true })
  deletedBy: string;
}
