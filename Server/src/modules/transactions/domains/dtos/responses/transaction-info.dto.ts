import { TransactionType } from '../../../../../constants/transaction-types.constant';
import { TransactionEntity } from '../../entities/transaction.entity';

export class TransactionInfoDto {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  accountNumber: string;
  createAt: Date;
  relatedAccountNumber?: string | null;

  constructor(transaction: TransactionEntity) {
    this.id = transaction.id;
    this.type = transaction.type;
    this.amount = transaction.amount;
    this.description = transaction.description;
    this.accountNumber = transaction.account.accountNumber;
    this.createAt = transaction.createdAt;
    this.relatedAccountNumber = transaction.relatedAccount?.accountNumber;
  }
}
