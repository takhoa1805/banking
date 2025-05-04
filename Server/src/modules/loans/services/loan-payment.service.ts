import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ILoanPaymentRepository } from '../repositories/loan-payment.repository';
import { LoanPaymentInfoDto } from '../domains/dtos/response/loan-payment.dto';
import { LoanPaymentEntity } from '../domains/entities/loan-payment.entity';
import { ILoanService } from './loan.service';
import { LoanStatus } from '../../../constants/loan-status.constant';
import { LoanPaymentCreationDto } from '../domains/dtos/requests/loan-payment-creation.dto';
import { TransactionCreationDto } from '../../transactions/domains/dtos/requests/transaction-creation.dto';
import { TransactionType } from '../../../constants/transaction-types.constant';
import { ITransactionService } from '../../transactions/services/transaction.service';

export interface ILoanPaymentService {
  getLoanPaymentById(loanPaymentId: string): Promise<LoanPaymentInfoDto>;
  getLoanPaymentEntityById(
    loanPaymentId: string,
    relations?: string[],
  ): Promise<LoanPaymentEntity>;
  getLoanPaymentsByLoanId(loanId: string): Promise<LoanPaymentInfoDto[]>;
  getLoanPaymentPreview(
    loanId: string,
    paidAmount: number,
  ): Promise<LoanPaymentInfoDto>;
  createLoanPayment(
    loanPaymentCreation: LoanPaymentCreationDto,
  ): Promise<LoanPaymentInfoDto>;
}

@Injectable()
export class LoanPaymentService implements ILoanPaymentService {
  constructor(
    @Inject('ILoanPaymentRepository')
    private readonly loanPaymentRepository: ILoanPaymentRepository,
    @Inject('ILoanService')
    private readonly loanService: ILoanService,
    @Inject('ITransactionService')
    private readonly transactionService: ITransactionService,
  ) {}

  async getLoanPaymentById(loanPaymentId: string): Promise<LoanPaymentInfoDto> {
    try {
      const loan =
        await this.loanPaymentRepository.findLoanPaymentById(loanPaymentId);

      if (!loan) {
        throw new NotFoundException(
          `The loan payment with Id ${loanPaymentId} was not found`,
        );
      }

      return new LoanPaymentInfoDto(loan);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getLoanPaymentEntityById(
    loanPaymentId: string,
    relations?: string[],
  ): Promise<LoanPaymentEntity> {
    try {
      const loan = await this.loanPaymentRepository.findLoanPaymentById(
        loanPaymentId,
        relations,
      );

      if (!loan) {
        throw new NotFoundException(
          `The loan payment with Id ${loanPaymentId} was not found`,
        );
      }

      return loan;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getLoanPaymentsByLoanId(loanId: string): Promise<LoanPaymentInfoDto[]> {
    try {
      const loan = await this.loanService.getLoanEntityById(loanId);

      if (!loan) {
        throw new NotFoundException(`Can not find loan with id ${loanId}`);
      }

      const loanPayments =
        await this.loanPaymentRepository.findLoanPaymentsByLoanId(loanId);

      return loanPayments.map((payment) => new LoanPaymentInfoDto(payment));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getLoanPaymentPreview(
    loanId: string,
    paidAmount: number,
  ): Promise<LoanPaymentInfoDto> {
    try {
      const loan = await this.loanService.getLoanEntityById(loanId);

      if (loan.status != LoanStatus.ACTIVE) {
        throw new BadRequestException('This loan does not need any payment');
      }

      const loanPayment = new LoanPaymentEntity();
      loanPayment.id = 'preview-id';
      loanPayment.scheduledPaymentDate = loan.scheduledPaymentDate;
      loanPayment.principalAmount = loan.loanAmount;
      loanPayment.interestAmount = Math.ceil(
        (loan.loanAmount * loan.interestRate) / 100,
      );
      loanPayment.totalPaymentAmount =
        loanPayment.principalAmount + loanPayment.interestAmount;
      loanPayment.paidAmount = paidAmount;
      loanPayment.createdAt = new Date(Date.now());
      loanPayment.transactionId = 'transaction-preview-id';

      if (paidAmount < loanPayment.interestAmount) {
        throw new BadRequestException(
          'Paid Amount have to greater than interest amount',
        );
      }

      return new LoanPaymentInfoDto(loanPayment);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createLoanPayment(
    loanPaymentCreation: LoanPaymentCreationDto,
  ): Promise<LoanPaymentInfoDto> {
    try {
      if (loanPaymentCreation.paidAmount < loanPaymentCreation.interestAmount) {
        throw new BadRequestException(
          'Paid Amount have to greater than interest amount',
        );
      }

      const loan = await this.loanService.getLoanEntityById(
        loanPaymentCreation.loanId,
        ['account'],
      );

      if (loan.status != LoanStatus.ACTIVE) {
        throw new BadRequestException('This loan does not need any payment');
      }

      if (loanPaymentCreation.paidAmount > loan.account.currentBalance) {
        throw new BadRequestException(
          'Do not have enough money in account to pay',
        );
      }

      const repayTransaction = new TransactionCreationDto(
        TransactionType.REPAY,
        loanPaymentCreation.paidAmount,
        `REPAY FOR THE LOAN ${loan.id}`,
        loan.account.accountNumber,
      );

      const transactionRepayInfo =
        await this.transactionService.createRepayTransaction(repayTransaction);

      const loanPayment = await this.loanPaymentRepository.createLoanPayment(
        loanPaymentCreation,
        {
          ...loan,
          loanAmount:
            loanPaymentCreation.totalPaymentAmount -
            loanPaymentCreation.paidAmount,
          account: undefined,
        },
        transactionRepayInfo.id,
      );

      if (loanPayment.loan.loanAmount == 0) {
        this.loanService.closeLoanRequest(loanPayment.loan.id);
      }

      return new LoanPaymentInfoDto(loanPayment);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
