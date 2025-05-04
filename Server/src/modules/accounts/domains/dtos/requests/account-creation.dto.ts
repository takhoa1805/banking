import { AccountStatus } from '../../../../../constants/account-status.constant';

export class AccountCreationDto {
  currentBalance: number;
  userId: string;
  status?: AccountStatus;

  constructor(currentBalance: number, userId: string, status?: AccountStatus) {
    this.currentBalance = currentBalance;
    this.status = status;
    this.userId = userId;
  }
}
