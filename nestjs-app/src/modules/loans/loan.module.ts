import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanEntity } from './domains/entities/loan.entity';
import { LoanPaymentEntity } from './domains/entities/loan-payment.entity';
import { LoanService } from './services/loan.service';
import { LoanPaymentService } from './services/loan-payment.service';
import { LoanRepository } from './repositories/loan.repository';
import { LoanPaymentRepository } from './repositories/loan-payment.repository';
import { AccountModule } from '../accounts/account.module';
import { CommonModule } from '../common/common.module';
import { LoanController } from './controllers/loan.controller';
import { LoanPaymentController } from './controllers/loan-payment.controller';
import { TransactionModule } from '../transactions/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoanEntity, LoanPaymentEntity]),
    AccountModule,
    CommonModule,
    TransactionModule,
  ],
  controllers: [LoanController, LoanPaymentController],
  exports: [
    'ILoanService',
    'ILoanPaymentService',
    'ILoanRepository',
    'ILoanPaymentRepository',
  ],
  providers: [
    {
      provide: 'ILoanService',
      useClass: LoanService,
    },
    {
      provide: 'ILoanPaymentService',
      useClass: LoanPaymentService,
    },
    {
      provide: 'ILoanRepository',
      useClass: LoanRepository,
    },
    {
      provide: 'ILoanPaymentRepository',
      useClass: LoanPaymentRepository,
    },
  ],
})
export class LoanModule {}
