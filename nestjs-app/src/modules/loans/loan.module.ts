import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanEntity } from './domains/entities/loan.entity';
import { LoanPaymentEntity } from './domains/entities/loan-payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity, LoanPaymentEntity])],
  controllers: [],
  exports: [],
  providers: [],
})
export class LoanModule {}
