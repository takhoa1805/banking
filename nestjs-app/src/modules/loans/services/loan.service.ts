import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ILoanRepository } from '../repositories/loan.repository';
import { LoanInfoDto } from '../domains/dtos/response/loan-info.dto';
import { LoanEntity } from '../domains/entities/loan.entity';
import { LoanCreationDto } from '../domains/dtos/requests/loan-creation.dto';
import { IAccountService } from '../../accounts/services/account.service';
import { LoanStatus } from '../../../constants/loan-status.constant';
import { Role } from '../../../constants/role.constant';

export interface ILoanService {
  getLoanById(loanId: string): Promise<LoanInfoDto>;
  getLoanEntityById(loanId: string, relations?: string[]): Promise<LoanEntity>;
  getLoansByAccountNumber(accountNumber: string): Promise<LoanInfoDto[]>;
  createLoanByAdmin(loanCreationDto: LoanCreationDto): Promise<LoanInfoDto>;
  createLoanByUser(loanCreationDto: LoanCreationDto): Promise<LoanInfoDto>;
  approveLoanRequest(loanId: string): Promise<LoanInfoDto>;
  declineLoanRequest(loanId: string): Promise<LoanInfoDto>;
  cancelLoanRequest(loanId: string, role: Role): Promise<LoanInfoDto>;
  closeLoanRequest(loanId: string): Promise<LoanInfoDto>;
}

@Injectable()
export class LoanService implements ILoanService {
  constructor(
    @Inject('ILoanRepository')
    private readonly loanRepository: ILoanRepository,
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
  ) {}

  async getLoanById(loanId: string): Promise<LoanInfoDto> {
    try {
      const loan = await this.loanRepository.findLoanById(loanId);

      if (!loan) {
        throw new NotFoundException(`The loan with Id ${loanId} was not found`);
      }

      return new LoanInfoDto(loan);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getLoanEntityById(
    loanId: string,
    relations?: string[],
  ): Promise<LoanEntity> {
    try {
      const loan = await this.loanRepository.findLoanById(loanId, relations);

      if (!loan) {
        throw new NotFoundException(`The loan with Id ${loanId} was not found`);
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

  async getLoansByAccountNumber(accountNumber: string): Promise<LoanInfoDto[]> {
    try {
      const account =
        await this.accountService.getAccountEntityByAccountNumber(
          accountNumber,
        );

      if (!account) {
        throw new NotFoundException(
          `Can not find account with number ${accountNumber}`,
        );
      }

      const loans =
        await this.loanRepository.findLoansByAccountNumber(accountNumber);

      return loans.map((loan) => new LoanInfoDto(loan));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createLoanByAdmin(
    loanCreationDto: LoanCreationDto,
  ): Promise<LoanInfoDto> {
    try {
      const account = await this.accountService.getAccountEntityByAccountNumber(
        loanCreationDto.accountNumber,
      );

      if (!account) {
        throw new NotFoundException(
          `The account with number ${loanCreationDto.accountNumber} was not found`,
        );
      }

      const loan = await this.loanRepository.createLoan(
        {
          ...loanCreationDto,
          status: LoanStatus.ACTIVE,
        },
        account,
      );

      return new LoanInfoDto(loan);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createLoanByUser(
    loanCreationDto: LoanCreationDto,
  ): Promise<LoanInfoDto> {
    try {
      const account = await this.accountService.getAccountEntityByAccountNumber(
        loanCreationDto.accountNumber,
      );

      if (!account) {
        throw new NotFoundException(
          `The account with number ${loanCreationDto.accountNumber} was not found`,
        );
      }

      const loan = await this.loanRepository.createLoan(
        {
          ...loanCreationDto,
          status: LoanStatus.PENDING,
        },
        account,
      );

      return new LoanInfoDto(loan);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async approveLoanRequest(loanId: string): Promise<LoanInfoDto> {
    try {
      const loan = await this.getLoanEntityById(loanId, ['account']);

      const updatedLoan = await this.loanRepository.updateLoanStatus(
        loan,
        LoanStatus.ACTIVE,
        loan.account,
      );

      return new LoanInfoDto(updatedLoan);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async declineLoanRequest(loanId: string): Promise<LoanInfoDto> {
    try {
      const loan = await this.getLoanEntityById(loanId);

      const updatedLoan = await this.loanRepository.updateLoanStatus(
        loan,
        LoanStatus.DECLINED,
      );

      return new LoanInfoDto(updatedLoan);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async cancelLoanRequest(loanId: string, role: Role): Promise<LoanInfoDto> {
    try {
      const loan = await this.getLoanEntityById(loanId);

      if (role == Role.ADMIN) {
        const updatedLoan = await this.loanRepository.updateLoanStatus(
          loan,
          LoanStatus.CANCELED,
        );

        return new LoanInfoDto(updatedLoan);
      } else {
        if (loan.status == LoanStatus.PENDING) {
          const updatedLoan = await this.loanRepository.updateLoanStatus(
            loan,
            LoanStatus.CANCELED,
          );

          return new LoanInfoDto(updatedLoan);
        } else {
          throw new BadRequestException(`You cannot cancel this loan`);
        }
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async closeLoanRequest(loanId: string): Promise<LoanInfoDto> {
    try {
      const loan = await this.getLoanEntityById(loanId);

      const updatedLoan = await this.loanRepository.updateLoanStatus(
        loan,
        LoanStatus.CLOSED,
      );

      return new LoanInfoDto(updatedLoan);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
