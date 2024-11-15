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
import { LoanStatus } from '../../../../constants/loan-status.constant';
import { AccountEntity } from '../../../accounts/domains/entities/account.entity';
import { LoanPaymentEntity } from './loan-payment.entity';

@Entity('loans')
export class LoanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  LoanAmount: number;

  @Column({ nullable: false })
  interestRate: number;

  @Column({ nullable: false })
  term: number;

  @Column({ nullable: false })
  status: LoanStatus;

  @ManyToOne(() => AccountEntity, (account) => account.loan)
  account: AccountEntity;

  @OneToMany(
    () => LoanPaymentEntity,
    (loanPaymentEntity) => loanPaymentEntity.loan,
  )
  loanPayment: LoanPaymentEntity[];

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
