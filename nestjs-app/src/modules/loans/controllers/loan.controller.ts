import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ILoanService } from '../services/loan.service';
import { LoanCreationDto } from '../domains/dtos/requests/loan-creation.dto';
import { LoanInfoDto } from '../domains/dtos/response/loan-info.dto';
import { Roles } from '../../../decorators/roles.decorator';
import { Role } from '../../../constants/role.constant';
import { AuthPayload } from '../../auth/domains/interfaces/auth-payload.interface';
import { User } from '../../../decorators/user-payload.decorator';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import {
  Pagination,
  PaginationParams,
} from '../../../decorators/pagination-params.decorator';
import {
  Sorting,
  SortingParams,
} from '../../../decorators/sorting-params.decorator';
import {
  Filtering,
  FilteringParams,
} from '../../../decorators/filtering-params.decorator';
import { PaginatedResource } from '../../common/types/paginated-resource.dto';

@Controller('loans')
export class LoanController {
  constructor(
    @Inject('ILoanService')
    private readonly loanService: ILoanService,
  ) {}

  @Roles(Role.ADMIN)
  @Get()
  async getLoans(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['id', 'createat', 'status']) sort?: Sorting,
    @FilteringParams(['status']) filter?: Filtering,
  ): Promise<PaginatedResource<LoanInfoDto>> {
    return this.loanService.getLoans(paginationParams, sort, filter);
  }

  @Roles(Role.ADMIN)
  @Post('admin')
  async createLoanByAdmin(
    @Body() loanCreationDto: LoanCreationDto,
  ): Promise<LoanInfoDto> {
    return await this.loanService.createLoanByAdmin(loanCreationDto);
  }

  @Roles(Role.USER)
  @Post('user')
  async createLoanByUser(
    @Body() loanCreationDto: LoanCreationDto,
  ): Promise<LoanInfoDto> {
    return await this.loanService.createLoanByUser(loanCreationDto);
  }

  @Roles(Role.ADMIN)
  @Get(':id/approval')
  async approveLoanRequest(@Param('id') loanId: string): Promise<LoanInfoDto> {
    return await this.loanService.approveLoanRequest(loanId);
  }

  @Roles(Role.ADMIN)
  @Get(':id/decline')
  async declineLoanRequest(@Param('id') loanId: string): Promise<LoanInfoDto> {
    return await this.loanService.declineLoanRequest(loanId);
  }

  @Roles(Role.ADMIN)
  @Get(':id/close')
  async closeLoanRequest(@Param('id') loanId: string): Promise<LoanInfoDto> {
    return await this.loanService.closeLoanRequest(loanId);
  }

  @Get(':id/cancellation')
  async cancelLoanRequest(
    @User() userPayload: AuthPayload,
    @Param('id') loanId: string,
  ): Promise<LoanInfoDto> {
    return await this.loanService.cancelLoanRequest(loanId, userPayload.role);
  }

  @PublicRoute()
  @Get()
  async getLoansByAccountNumber(
    @Query('account-number') accountNumber: string,
  ): Promise<LoanInfoDto[]> {
    return await this.loanService.getLoansByAccountNumber(accountNumber);
  }
}
