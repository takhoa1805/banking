import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IAccountRepository } from '../repositories/account.repository';
import { AccountInfoDto } from '../domains/dtos/responses/account-info.dto';
import { IUserService } from '../../users/services/user.service';
import { AccountCreationDto } from '../domains/dtos/requests/account-creation.dto';
import { ICommonService } from '../../common/services/common.service';
import { AccountEntity } from '../domains/entities/account.entity';
import { Role } from '../../../constants/role.constant';
import { AccountStatus } from '../../../constants/account-status.constant';

export interface IAccountService {
  getAccountById(accountId: string): Promise<AccountInfoDto>;
  getAccountEntityById(
    accountId: string,
    relations?: string[],
  ): Promise<AccountEntity>;
  getAccountByAccountNumber(accountNumber: string): Promise<AccountInfoDto>;
  getAccountEntityByAccountNumber(
    accountNumber: string,
    relations?: string[],
  ): Promise<AccountEntity>;
  getAccountsByUserId(userId: string): Promise<AccountInfoDto[]>;
  createAccount(
    accountCreationDto: AccountCreationDto,
    creatorRole: Role,
    creatorId: string,
  ): Promise<AccountInfoDto>;
  activeAccount(accountId: string, userId: string): Promise<AccountInfoDto>;
  suspendAccount(accountId: string, userId: string): Promise<AccountInfoDto>;
  closeAccount(accountId: string, userId: string): Promise<AccountInfoDto>;
}

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
    @Inject('IUserService')
    private readonly userService: IUserService,
    @Inject('ICommonService')
    private readonly commonService: ICommonService,
  ) {}

  async getAccountById(accountId: string): Promise<AccountInfoDto> {
    try {
      const account = await this.accountRepository.findAccountById(accountId);

      if (!account) {
        throw new NotFoundException(
          `The account with Id ${accountId} was not found`,
        );
      }

      return new AccountInfoDto(account);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getAccountEntityById(
    accountId: string,
    relations?: string[],
  ): Promise<AccountEntity> {
    try {
      const account = await this.accountRepository.findAccountById(
        accountId,
        relations,
      );

      if (!account) {
        throw new NotFoundException(
          `The account with Id ${accountId} was not found`,
        );
      }

      return account;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getAccountByAccountNumber(
    accountNumber: string,
  ): Promise<AccountInfoDto> {
    try {
      const account =
        await this.accountRepository.findAccountByAccountNumber(accountNumber);

      if (!account) {
        throw new NotFoundException(
          `The account with Id ${accountNumber} was not found`,
        );
      }

      return new AccountInfoDto(account);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getAccountEntityByAccountNumber(
    accountNumber: string,
    relations?: string[],
  ): Promise<AccountEntity> {
    try {
      const account = await this.accountRepository.findAccountByAccountNumber(
        accountNumber,
        relations,
      );

      if (!account) {
        throw new NotFoundException(
          `The account with Id ${accountNumber} was not found`,
        );
      }

      return account;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getAccountsByUserId(userId: string): Promise<AccountInfoDto[]> {
    try {
      const user = await this.userService.getUserEntityById(userId);

      if (!user) {
        throw new NotFoundException(`Can not find user with id ${userId}`);
      }

      const accounts =
        await this.accountRepository.findAccountsByUserId(userId);

      return accounts.map((acc) => new AccountInfoDto(acc));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createAccount(
    accountCreationDto: AccountCreationDto,
    creatorRole: Role,
    creatorId: string,
  ): Promise<AccountInfoDto> {
    try {
      const accountOwner = await this.userService.getUserEntityById(
        accountCreationDto.userId,
      );

      const accountNumber = await this.commonService.getAccountNumber();

      if (creatorRole == Role.ADMIN) {
        const newAccount = await this.accountRepository.createAccount(
          { ...accountCreationDto, status: AccountStatus.ACTIVE },
          accountOwner,
          accountNumber.toString(),
          creatorId,
        );

        return new AccountInfoDto(newAccount);
      } else {
        const newAccount = await this.accountRepository.createAccount(
          { ...accountCreationDto, status: AccountStatus.PENDING },
          accountOwner,
          accountNumber.toString(),
          creatorId,
        );

        return new AccountInfoDto(newAccount);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async activeAccount(
    accountId: string,
    userId: string,
  ): Promise<AccountInfoDto> {
    try {
      const account = await this.accountRepository.findAccountById(accountId);

      if (!account) {
        throw new NotFoundException(
          `The account with Id ${accountId} was not found`,
        );
      }

      const updateAccount = await this.accountRepository.updateAccountStatus(
        account,
        AccountStatus.ACTIVE,
        userId,
      );

      return new AccountInfoDto(updateAccount);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async suspendAccount(
    accountId: string,
    userId: string,
  ): Promise<AccountInfoDto> {
    try {
      const account = await this.accountRepository.findAccountById(accountId);

      if (!account) {
        throw new NotFoundException(
          `The account with Id ${accountId} was not found`,
        );
      }

      const updateAccount = await this.accountRepository.updateAccountStatus(
        account,
        AccountStatus.SUSPENDED,
        userId,
      );

      return new AccountInfoDto(updateAccount);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async closeAccount(
    accountId: string,
    userId: string,
  ): Promise<AccountInfoDto> {
    try {
      const account = await this.accountRepository.findAccountById(accountId);

      if (!account) {
        throw new NotFoundException(
          `The account with Id ${accountId} was not found`,
        );
      }

      const updateAccount = await this.accountRepository.updateAccountStatus(
        account,
        AccountStatus.CLOSED,
        userId,
      );

      return new AccountInfoDto(updateAccount);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
