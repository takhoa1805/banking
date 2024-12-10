import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../domains/entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionCreationDto } from '../domains/dtos/requests/transaction-creation.dto';
import { AccountEntity } from '../../accounts/domains/entities/account.entity';

export interface ITransactionRepository {
  findTransactionById(
    transactionId: string,
    relations?: string[],
  ): Promise<TransactionEntity | null>;
  findTransactionsByAccountNumber(
    accountNumber: string,
  ): Promise<TransactionEntity[]>;
  createWithdrawalTransaction(
    transactionCreationDto: TransactionCreationDto,
    account: AccountEntity,
  ): Promise<TransactionEntity>;
  createDepositTransaction(
    transactionCreationDto: TransactionCreationDto,
    account: AccountEntity,
  ): Promise<TransactionEntity>;
  createTransferTransaction(
    transactionCreationDto: TransactionCreationDto,
    sender: AccountEntity,
    receiver: AccountEntity,
  ): Promise<TransactionEntity>;
  createRepayTransaction(
    transactionCreationDto: TransactionCreationDto,
    account: AccountEntity,
  );
}

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async findTransactionById(
    transactionId: string,
    relations?: string[],
  ): Promise<TransactionEntity | null> {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: transactionId,
      },
      relations: relations,
    });

    return transaction;
  }

  async findTransactionsByAccountNumber(
    accountNumber: string,
  ): Promise<TransactionEntity[]> {
    const transactions = await this.transactionRepository.find({
      where: {
        account: {
          accountNumber: accountNumber,
        },
      },
      relations: ['account'],
    });

    return transactions;
  }

  async createWithdrawalTransaction(
    transactionCreationDto: TransactionCreationDto,
    account: AccountEntity,
  ): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.save({
      ...transactionCreationDto,
      amount: -1 * transactionCreationDto.amount,
      account: {
        ...account,
        currentBalance: account.currentBalance - transactionCreationDto.amount,
      },
      relatedAccount: null,
    });

    return transaction;
  }

  async createDepositTransaction(
    transactionCreationDto: TransactionCreationDto,
    account: AccountEntity,
  ): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.save({
      ...transactionCreationDto,
      account: {
        ...account,
        currentBalance: account.currentBalance + transactionCreationDto.amount,
      },
      relatedAccount: null,
    });

    return transaction;
  }

  async createTransferTransaction(
    transactionCreationDto: TransactionCreationDto,
    sender: AccountEntity,
    receiver: AccountEntity,
  ): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.save({
      ...transactionCreationDto,
      amount: -1 * transactionCreationDto.amount,
      account: {
        ...sender,
        currentBalance: sender.currentBalance - transactionCreationDto.amount,
      },
      relatedAccount: {
        ...receiver,
        currentBalance: receiver.currentBalance + transactionCreationDto.amount,
      },
    });

    await this.transactionRepository.save({
      ...transactionCreationDto,
      account: transaction.relatedAccount,
      relatedAccount: transaction.account,
    });

    return transaction;
  }

  async createRepayTransaction(
    transactionCreationDto: TransactionCreationDto,
    account: AccountEntity,
  ): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.save({
      ...transactionCreationDto,
      amount: -1 * transactionCreationDto.amount,
      account: {
        ...account,
        currentBalance: account.currentBalance - transactionCreationDto.amount,
      },
      relatedAccount: null,
    });

    return transaction;
  }
}
