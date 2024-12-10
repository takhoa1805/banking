import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LoanEntity } from './loan.entity';

@Entity('loan_payments')
export class LoanPaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  scheduledPaymentDate: Date;

  @Column({ nullable: false })
  totalPaymentAmount: number;

  @Column({ nullable: false })
  principalAmount: number;

  @Column({ nullable: false })
  interestAmount: number;

  @Column({ nullable: false })
  paidAmount: number;

  @Column({ nullable: false })
  transactionId: string;

  @ManyToOne(() => LoanEntity, (loan) => loan.loanPayment, { cascade: true })
  loan: LoanEntity;

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
