import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { IAccountService } from '../services/account.service';
import { AccountCreationDto } from '../domains/dtos/requests/account-creation.dto';
import { AccountInfoDto } from '../domains/dtos/responses/account-info.dto';
import { User } from '../../../decorators/user-payload.decorator';
import { AuthPayload } from '../../auth/domains/interfaces/auth-payload.interface';
import { UserId } from '../../../decorators/user-id.decorator';
import { PublicRoute } from '../../../decorators/public-route.decorator';

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
  ) {}

  @Post('')
  async createAccount(
    @User() user: AuthPayload,
    @Body() accountCreationDto: AccountCreationDto,
  ): Promise<AccountInfoDto> {
    return this.accountService.createAccount(
      accountCreationDto,
      user.role,
      user.id,
    );
  }

  @Get(':id/active')
  async activeAccount(
    @Param('id') accountId: string,
    @UserId() userId: string,
  ): Promise<AccountInfoDto> {
    return this.accountService.activeAccount(accountId, userId);
  }

  @Get(':id/suspend')
  async suspendAccount(
    @Param('id') accountId: string,
    @UserId() userId: string,
  ): Promise<AccountInfoDto> {
    return this.accountService.suspendAccount(accountId, userId);
  }

  @Get(':id/close')
  async closeAccount(
    @Param('id') accountId: string,
    @UserId() userId: string,
  ): Promise<AccountInfoDto> {
    return this.accountService.closeAccount(accountId, userId);
  }

  @PublicRoute()
  @Get('')
  async getAccountsByUserId(
    @Query('user-id') userId: string,
  ): Promise<AccountInfoDto[]> {
    return await this.accountService.getAccountsByUserId(userId);
  }
}
