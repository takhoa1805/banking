import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoanEntity } from './loan.entity';

@Entity('loan_payments')
export class LoanPaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  scheduledPaymentDate: Date;

  @Column({ nullable: false })
  totalPaymentAmount: number;

  @Column({ nullable: false })
  principalAmount: number;

  @Column({ nullable: false })
  interestAmount: number;

  @Column({ nullable: false })
  paidAmount: number;

  @Column({ nullable: true })
  paidDate: Date;

  @ManyToOne(() => LoanEntity, (loan) => loan.loanPayment)
  loan: LoanEntity;
}
