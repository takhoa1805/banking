import { AccountStatus } from '../../../../../constants/account-status.constant';
import { AccountEntity } from '../../entities/account.entity';

export class AccountInfoDto {
  accountNumber: string;
  currentBalance: number;
  status: AccountStatus;
  createAt: Date;
  accountName?: string;
  accountOwnerId?: string;

  constructor(accountEntity: AccountEntity) {
    this.accountNumber = accountEntity.accountNumber;
    this.currentBalance = accountEntity.currentBalance;
    this.status = accountEntity.status;
    this.createAt = accountEntity.createdAt;
    this.accountName = accountEntity.user?.name;
    this.accountOwnerId = accountEntity.user?.id;
  }
}
