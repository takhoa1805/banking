import { LoanStatus } from '../../../../../constants/loan-status.constant';
import { LoanEntity } from '../../entities/loan.entity';

export class LoanInfoDto {
  id: string;
  loanAmount: number;
  interestRate: number;
  term: number;
  status: LoanStatus;
  scheduledPaymentDate: Date;

  constructor(loanEnitity: LoanEntity) {
    this.id = loanEnitity.id;
    this.loanAmount = loanEnitity.loanAmount;
    this.interestRate = loanEnitity.interestRate;
    this.term = loanEnitity.term;
    this.status = loanEnitity.status;
    this.scheduledPaymentDate = loanEnitity.scheduledPaymentDate
      ? loanEnitity.scheduledPaymentDate
      : null;
  }
}
