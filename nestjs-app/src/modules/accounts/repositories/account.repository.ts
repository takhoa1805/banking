import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../domains/entities/account.entity';
import { Repository } from 'typeorm';
import { AccountCreationDto } from '../domains/dtos/requests/account-creation.dto';
import { UserEntity } from '../../users/domains/entities/user.entity';
import { AccountStatus } from '../../../constants/account-status.constant';

export interface IAccountRepository {
  findAccountById(
    accountId: string,
    relations?: string[],
  ): Promise<AccountEntity | null>;
  findAccountByAccountNumber(
    accountNumber: string,
    relations?: string[],
  ): Promise<AccountEntity | null>;
  findAccountsByUserId(userId: string): Promise<AccountEntity[]>;
  createAccount(
    accountCreationDto: AccountCreationDto,
    accountOwner: UserEntity,
    accountNumber: string,
    userId: string,
  ): Promise<AccountEntity>;
  updateAccountStatus(
    accountEntity: AccountEntity,
    status: AccountStatus,
    userId: string,
  ): Promise<AccountEntity>;
}

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async findAccountById(
    accountId: string,
    relations?: string[],
  ): Promise<AccountEntity | null> {
    const account = await this.accountRepository.findOne({
      where: {
        id: accountId,
      },
      relations: relations,
    });

    return account;
  }

  async findAccountByAccountNumber(
    accountNumber: string,
    relations?: string[],
  ): Promise<AccountEntity | null> {
    const account = await this.accountRepository.findOne({
      where: {
        accountNumber: accountNumber,
      },
      relations: relations,
    });

    return account;
  }

  async findAccountsByUserId(userId: string): Promise<AccountEntity[]> {
    const accounts = await this.accountRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });

    return accounts;
  }

  async createAccount(
    accountCreationDto: AccountCreationDto,
    accountOwner: UserEntity,
    accountNumber: string,
    userId: string,
  ): Promise<AccountEntity> {
    const newAccount = await this.accountRepository.save({
      ...accountCreationDto,
      accountNumber: accountNumber,
      user: accountOwner,
      createdBy: userId,
    });

    return newAccount;
  }

  async updateAccountStatus(
    accountEntity: AccountEntity,
    status: AccountStatus,
    userId: string,
  ): Promise<AccountEntity> {
    const account = await this.accountRepository.save({
      ...accountEntity,
      status: status,
      updatedBy: userId,
    });

    return account;
  }
}
