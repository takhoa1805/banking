import { TransactionType } from '../../../../../constants/transaction-types.constant';

export class TransactionCreationDto {
  type: TransactionType;
  amount: number;
  description: string;
  accountNumber: string;
  relatedAccountNumber?: string;

  constructor(
    type: TransactionType,
    amount: number,
    description: string,
    accountNumber: string,
    relatedAccountNumber?: string,
  ) {
    this.type = type;
    this.amount = amount;
    this.description = description;
    this.accountNumber = accountNumber;
    this.relatedAccountNumber = relatedAccountNumber;
  }
}
