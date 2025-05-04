export class LoanPaymentCreationDto {
  totalPaymentAmount: number;
  principalAmount: number;
  interestAmount: number;
  paidAmount: number;
  loanId: string;

  constructor(
    totalPaymentAmount: number,
    principleAmount: number,
    interestAmount: number,
    paidAmount: number,
    loanId: string,
  ) {
    this.totalPaymentAmount = totalPaymentAmount;
    this.principalAmount = principleAmount;
    this.interestAmount = interestAmount;
    this.paidAmount = paidAmount;
    this.loanId = loanId;
  }
}
