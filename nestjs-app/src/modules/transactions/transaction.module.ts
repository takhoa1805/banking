import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './domains/entities/transaction.entity';
import { TransactionService } from './services/transaction.service';
import { TransactionRepository } from './repositories/transaction.repository';
import { AccountModule } from '../accounts/account.module';
import { UserModule } from '../users/user.module';
import { TransactionController } from './controllers/transaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    AccountModule,
    UserModule,
  ],
  controllers: [TransactionController],
  exports: ['ITransactionService', 'ITransactionRepository'],
  providers: [
    {
      provide: 'ITransactionService',
      useClass: TransactionService,
    },
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepository,
    },
  ],
})
export class TransactionModule {}
