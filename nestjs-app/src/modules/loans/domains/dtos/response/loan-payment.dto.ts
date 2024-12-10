import { LoanPaymentEntity } from '../../entities/loan-payment.entity';

export class LoanPaymentInfoDto {
  id: string;
  scheduledPaymentDate: Date;
  totalPaymentAmount: number;
  principalAmount: number;
  interestAmount: number;
  paidAmount: number;
  transactionId: string;
  createdAt: Date;

  constructor(loanPayment: LoanPaymentEntity) {
    this.id = loanPayment.id;
    this.scheduledPaymentDate = loanPayment.scheduledPaymentDate
      ? loanPayment.scheduledPaymentDate
      : null;
    this.totalPaymentAmount = loanPayment.totalPaymentAmount;
    this.principalAmount = loanPayment.principalAmount;
    this.interestAmount = loanPayment.interestAmount;
    this.paidAmount = loanPayment.paidAmount;
    this.transactionId = loanPayment.transactionId;
    this.createdAt = loanPayment.createdAt;
  }
}
