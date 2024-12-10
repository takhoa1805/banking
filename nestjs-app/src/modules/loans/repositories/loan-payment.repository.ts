import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanPaymentEntity } from '../domains/entities/loan-payment.entity';
import { Repository } from 'typeorm';
import { LoanPaymentCreationDto } from '../domains/dtos/requests/loan-payment-creation.dto';
import { LoanEntity } from '../domains/entities/loan.entity';
import { ICommonService } from '../../common/services/common.service';

export interface ILoanPaymentRepository {
  findLoanPaymentById(
    loanPaymentId: string,
    relations?: string[],
  ): Promise<LoanPaymentEntity | null>;
  findLoanPaymentsByLoanId(loanId: string): Promise<LoanPaymentEntity[]>;
  createLoanPayment(
    loanPaymentCreationDto: LoanPaymentCreationDto,
    loanEntity: LoanEntity,
    transactionId: string,
  ): Promise<LoanPaymentEntity>;
}

@Injectable()
export class LoanPaymentRepository implements ILoanPaymentRepository {
  constructor(
    @InjectRepository(LoanPaymentEntity)
    private readonly loanPaymentRepository: Repository<LoanPaymentEntity>,
    @Inject('ICommonService')
    private readonly commonService: ICommonService,
  ) {}

  async findLoanPaymentById(
    loanPaymentId: string,
    relations?: string[],
  ): Promise<LoanPaymentEntity | null> {
    const loanPayment = await this.loanPaymentRepository.findOne({
      where: {
        id: loanPaymentId,
      },
      relations: relations,
    });

    return loanPayment;
  }

  async findLoanPaymentsByLoanId(loanId: string): Promise<LoanPaymentEntity[]> {
    const loanPayments = await this.loanPaymentRepository.find({
      where: {
        loan: {
          id: loanId,
        },
      },
      relations: ['loan'],
    });

    return loanPayments;
  }

  async createLoanPayment(
    loanPaymentCreationDto: LoanPaymentCreationDto,
    loanEntity: LoanEntity,
    transactionId: string,
  ): Promise<LoanPaymentEntity> {
    const loanPayment = await this.loanPaymentRepository.save({
      ...loanPaymentCreationDto,
      loan: {
        ...loanEntity,
        scheduledPaymentDate:
          loanPaymentCreationDto.totalPaymentAmount == loanEntity.loanAmount
            ? null
            : this.commonService.getDateAfterMonth(
                loanEntity.term,
                loanEntity.scheduledPaymentDate,
              ),
      },
      scheduledPaymentDate:
        loanPaymentCreationDto.totalPaymentAmount == loanEntity.loanAmount
          ? null
          : this.commonService.getDateAfterMonth(
              loanEntity.term,
              loanEntity.scheduledPaymentDate,
            ),
      transactionId: transactionId,
    });

    return loanPayment;
  }
}
