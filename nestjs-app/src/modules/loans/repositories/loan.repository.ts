import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanEntity } from '../domains/entities/loan.entity';
import { Repository } from 'typeorm';
import { LoanCreationDto } from '../domains/dtos/requests/loan-creation.dto';
import { AccountEntity } from '../../accounts/domains/entities/account.entity';
import { ICommonService } from '../../common/services/common.service';
import { LoanStatus } from '../../../constants/loan-status.constant';

export interface ILoanRepository {
  findLoanById(
    loanId: string,
    relations?: string[],
  ): Promise<LoanEntity | null>;
  findLoansByAccountNumber(accountNumber: string): Promise<LoanEntity[]>;
  createLoan(
    loanCreationDto: LoanCreationDto,
    accountEntity: AccountEntity,
  ): Promise<LoanEntity>;
  updateLoanStatus(
    loanEntity: LoanEntity,
    loanStatus: LoanStatus,
    accountEntity?: AccountEntity,
  ): Promise<LoanEntity>;
}

@Injectable()
export class LoanRepository implements ILoanRepository {
  constructor(
    @InjectRepository(LoanEntity)
    private readonly loanRepository: Repository<LoanEntity>,
    @Inject('ICommonService')
    private readonly commonService: ICommonService,
  ) {}

  async findLoanById(
    loanId: string,
    relations?: string[],
  ): Promise<LoanEntity | null> {
    const loan = await this.loanRepository.findOne({
      where: {
        id: loanId,
      },
      relations: relations,
    });

    return loan;
  }

  async findLoansByAccountNumber(accountNumber: string): Promise<LoanEntity[]> {
    const loans = await this.loanRepository.find({
      where: {
        account: {
          accountNumber: accountNumber,
        },
      },
      relations: ['account'],
    });

    return loans;
  }

  async createLoan(
    loanCreationDto: LoanCreationDto,
    accountEntity: AccountEntity,
  ): Promise<LoanEntity> {
    const loan = await this.loanRepository.save({
      ...loanCreationDto,
      scheduledPaymentDate: this.commonService.getDateAfterMonth(
        loanCreationDto.term,
        new Date(Date.now()),
      ),
      account: {
        ...accountEntity,
        currentBalance:
          loanCreationDto.status == LoanStatus.ACTIVE
            ? accountEntity.currentBalance + loanCreationDto.loanAmount
            : accountEntity.currentBalance,
      },
    });

    return loan;
  }

  async updateLoanStatus(
    loanEntity: LoanEntity,
    loanStatus: LoanStatus,
    accountEntity?: AccountEntity,
  ): Promise<LoanEntity> {
    if (!accountEntity) {
      const loan = await this.loanRepository.save({
        ...loanEntity,
        status: loanStatus,
      });

      return loan;
    } else {
      const loan = await this.loanRepository.save({
        ...loanEntity,
        status: loanStatus,
        account: {
          ...accountEntity,
          currentBalance: accountEntity.currentBalance + loanEntity.loanAmount,
        },
      });

      return loan;
    }
  }
}
