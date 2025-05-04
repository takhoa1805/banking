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
  loanAmount: number;

  @Column({ nullable: false })
  interestRate: number;

  @Column({ nullable: false })
  term: number;

  @Column({ nullable: true })
  scheduledPaymentDate: Date;

  @Column({ nullable: false })
  status: LoanStatus;

  @ManyToOne(() => AccountEntity, (account) => account.loan, { cascade: true })
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
}
