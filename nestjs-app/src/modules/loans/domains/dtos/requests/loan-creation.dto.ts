import { LoanStatus } from '../../../../../constants/loan-status.constant';

export class LoanCreationDto {
  loanAmount: number;
  interestRate: number;
  term: number;
  accountNumber: string;
  status?: LoanStatus;

  constructor(
    loanAmount: number,
    interestRate: number,
    term: number,
    accountNumber: string,
    status?: LoanStatus,
  ) {
    this.loanAmount = loanAmount;
    this.interestRate = interestRate;
    this.term = term;
    this.accountNumber = accountNumber;
    this.status = status;
  }
}
