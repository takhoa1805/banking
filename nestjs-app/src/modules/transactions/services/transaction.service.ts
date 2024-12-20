import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TransactionInfoDto } from '../domains/dtos/responses/transaction-info.dto';
import { TransactionRepository } from '../repositories/transaction.repository';
import { AccountService } from '../../accounts/services/account.service';
import { TransactionEntity } from '../domains/entities/transaction.entity';
import { TransactionCreationDto } from '../domains/dtos/requests/transaction-creation.dto';
import { TransactionType } from '../../../constants/transaction-types.constant';
import { Pagination } from '../../../decorators/pagination-params.decorator';
import { Sorting } from '../../../decorators/sorting-params.decorator';
import { PaginatedResource } from '../../common/types/paginated-resource.dto';

export interface ITransactionService {
  getTransactionById(transactionId: string): Promise<TransactionInfoDto>;
  getTransactionEntityById(
    transactionId: string,
    relations?: string[],
  ): Promise<TransactionEntity>;
  getTransactionsByAccountNumber(
    accountNumber: string,
    paginationParams: Pagination,
    sort?: Sorting,
  ): Promise<PaginatedResource<TransactionInfoDto>>;
  createWithdrawalTransaction(
    transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto>;
  createDepositTransaction(
    transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto>;
  createTransferTransaction(
    transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto>;
  createRepayTransaction(
    transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto>;
}

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject('IAccountService')
    private readonly accountService: AccountService,
    @Inject('ITransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async getTransactionById(transactionId: string): Promise<TransactionInfoDto> {
    try {
      const transaction =
        await this.transactionRepository.findTransactionById(transactionId);

      if (!transaction) {
        throw new NotFoundException(
          `Not found transaction with id ${transactionId}`,
        );
      }

      return new TransactionInfoDto(transaction);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getTransactionEntityById(
    transactionId: string,
    relations?: string[],
  ): Promise<TransactionEntity> {
    try {
      const transaction = await this.transactionRepository.findTransactionById(
        transactionId,
        relations,
      );

      if (!transaction) {
        throw new NotFoundException(
          `Not found transaction with id ${transactionId}`,
        );
      }

      return transaction;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getTransactionsByAccountNumber(
    accountNumber: string,
    paginationParams: Pagination,
    sort?: Sorting,
  ): Promise<PaginatedResource<TransactionInfoDto>> {
    try {
      const account =
        await this.accountService.getAccountEntityByAccountNumber(
          accountNumber,
        );

      if (!account) {
        throw new NotFoundException(
          `Not found account with number ${accountNumber}`,
        );
      }

      const result =
        await this.transactionRepository.findTransactionsByAccountNumber(
          accountNumber,
          paginationParams,
          sort,
        );

      return {
        ...result,
        items: result.items.map(
          (transaction) => new TransactionInfoDto(transaction),
        ),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createDepositTransaction(
    transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto> {
    try {
      if (transactionCreationDto.type != TransactionType.DEPOSIT) {
        throw new BadRequestException(`Cannot use Deposit Function here!`);
      }

      if (transactionCreationDto.amount == 0) {
        throw new BadRequestException(
          `Amount of transaction must be greater than 0`,
        );
      }

      const account = await this.accountService.getAccountEntityByAccountNumber(
        transactionCreationDto.accountNumber,
      );

      const transaction =
        await this.transactionRepository.createDepositTransaction(
          transactionCreationDto,
          account,
        );

      return new TransactionInfoDto(transaction);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createWithdrawalTransaction(
    transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto> {
    try {
      if (transactionCreationDto.type != TransactionType.WITHDRAWAL) {
        throw new BadRequestException(`Cannot use Withdrawal Function here!`);
      }

      if (transactionCreationDto.amount == 0) {
        throw new BadRequestException(
          `Amount of transaction must be greater than 0`,
        );
      }

      const account = await this.accountService.getAccountEntityByAccountNumber(
        transactionCreationDto.accountNumber,
      );

      if (transactionCreationDto.amount > account.currentBalance) {
        throw new BadRequestException(
          'Current Balance left is not enough to proceed the transaction',
        );
      }

      const transaction =
        await this.transactionRepository.createWithdrawalTransaction(
          transactionCreationDto,
          account,
        );

      return new TransactionInfoDto(transaction);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createTransferTransaction(
    transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto> {
    try {
      if (transactionCreationDto.type != TransactionType.TRANSFER) {
        throw new BadRequestException(`Cannot use Transfer Function here!`);
      }

      if (transactionCreationDto.amount == 0) {
        throw new BadRequestException(
          `Amount of transaction must be greater than 0`,
        );
      }

      const sender = await this.accountService.getAccountEntityByAccountNumber(
        transactionCreationDto.accountNumber,
      );

      if (transactionCreationDto.amount > sender.currentBalance) {
        throw new BadRequestException(
          'Current Balance left is not enough to proceed the transaction',
        );
      }

      const receiver =
        await this.accountService.getAccountEntityByAccountNumber(
          transactionCreationDto.relatedAccountNumber,
        );

      const transaction =
        await this.transactionRepository.createTransferTransaction(
          transactionCreationDto,
          sender,
          receiver,
        );

      return new TransactionInfoDto(transaction);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createRepayTransaction(
    transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto> {
    try {
      if (transactionCreationDto.type != TransactionType.REPAY) {
        throw new BadRequestException(`Cannot use Repay Function here!`);
      }

      if (transactionCreationDto.amount == 0) {
        throw new BadRequestException(
          `Amount of transaction must be greater than 0`,
        );
      }

      const account = await this.accountService.getAccountEntityByAccountNumber(
        transactionCreationDto.accountNumber,
      );

      if (transactionCreationDto.amount > account.currentBalance) {
        throw new BadRequestException(
          'Current Balance left is not enough to proceed the transaction',
        );
      }

      const transaction =
        await this.transactionRepository.createWithdrawalTransaction(
          transactionCreationDto,
          account,
        );

      console.log(transaction);

      return new TransactionInfoDto(transaction);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
