import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ITransactionService } from '../services/transaction.service';
import { TransactionCreationDto } from '../domains/dtos/requests/transaction-creation.dto';
import { TransactionInfoDto } from '../domains/dtos/responses/transaction-info.dto';
import { PublicRoute } from '../../../decorators/public-route.decorator';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject('ITransactionService')
    private readonly transactionService: ITransactionService,
  ) {}

  @PublicRoute()
  @Get()
  async getTransactionsByAccountNumber(
    @Query('account-number') accountNumber: string,
  ): Promise<TransactionInfoDto[]> {
    return await this.transactionService.getTransactionsByAccountNumber(
      accountNumber,
    );
  }

  @Post('withdrawal')
  async createWithdrawalTransaction(
    @Body() transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto> {
    return this.transactionService.createWithdrawalTransaction(
      transactionCreationDto,
    );
  }

  @Post('deposit')
  async createDepositTransaction(
    @Body() transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto> {
    return this.transactionService.createDepositTransaction(
      transactionCreationDto,
    );
  }

  @Post('transfer')
  async createTransferTransaction(
    @Body() transactionCreationDto: TransactionCreationDto,
  ): Promise<TransactionInfoDto> {
    return this.transactionService.createTransferTransaction(
      transactionCreationDto,
    );
  }
}
