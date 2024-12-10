import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './domains/entities/account.entity';
import { AccountRepository } from './repositories/account.repository';
import { AccountService } from './services/account.service';
import { UserEntity } from '../users/domains/entities/user.entity';
import { UserModule } from '../users/user.module';
import { CommonModule } from '../common/common.module';
import { AccountController } from './controllers/account.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, UserEntity]),
    UserModule,
    CommonModule,
  ],
  controllers: [AccountController],
  exports: ['IAccountRepository', 'IAccountService'],
  providers: [
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
    {
      provide: 'IAccountService',
      useClass: AccountService,
    },
  ],
})
export class AccountModule {}
