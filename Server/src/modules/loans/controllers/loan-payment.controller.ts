import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ILoanPaymentService } from '../services/loan-payment.service';
import { LoanPaymentInfoDto } from '../domains/dtos/response/loan-payment.dto';
import { LoanPaymentCreationDto } from '../domains/dtos/requests/loan-payment-creation.dto';
import { PublicRoute } from '../../../decorators/public-route.decorator';

@Controller('loan-payments')
export class LoanPaymentController {
  constructor(
    @Inject('ILoanPaymentService')
    private readonly loanPaymentService: ILoanPaymentService,
  ) {}

  @Get(':id/preview')
  async getLoanPaymentPreview(
    @Param('id') loanId: string,
    @Query('paid-amount') paidAmount: number,
  ): Promise<LoanPaymentInfoDto> {
    return await this.loanPaymentService.getLoanPaymentPreview(
      loanId,
      Number(paidAmount),
    );
  }

  @Post()
  async createLoanPayment(
    @Body() loanPaymentCreationDto: LoanPaymentCreationDto,
  ): Promise<LoanPaymentInfoDto> {
    return await this.loanPaymentService.createLoanPayment(
      loanPaymentCreationDto,
    );
  }

  @PublicRoute()
  @Get()
  async getLoanPaymentsByLoanId(
    @Query('loan-id') loanId: string,
  ): Promise<LoanPaymentInfoDto[]> {
    return await this.loanPaymentService.getLoanPaymentsByLoanId(loanId);
  }
}
