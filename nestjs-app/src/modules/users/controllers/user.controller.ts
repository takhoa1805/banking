import { Body, Controller, Post, Inject, Put, Get } from '@nestjs/common';
import { IUserService } from '../services/user.service';
import { UserInfoDto } from '../domains/dtos/responses/user-info.dto';
import { UserCreationDto } from '../domains/dtos/requests/user-creation.dto';
import { UserId } from '../../../decorators/user-id.decorator';
import { UserUpdateDto } from '../domains/dtos/requests/user-update.dto';
import { AccessToken } from '../../auth/domains/dtos/responses/access-token.dto';
import { PasswordChangeDto } from '../domains/dtos/requests/password-change.dto';
import { Roles } from '../../../decorators/roles.decorator';
import { Role } from '../../../constants/role.constant';
import { AuthPayload } from '../../auth/domains/interfaces/auth-payload.interface';
import { User } from '../../../decorators/user-payload.decorator';
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
import { PublicRoute } from '../../../decorators/public-route.decorator';

@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @PublicRoute()
  @Get()
  async getUsers(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'role', 'id']) sort?: Sorting,
    @FilteringParams(['name', 'role', 'id']) filter?: Filtering,
  ): Promise<PaginatedResource<UserInfoDto>> {
    return await this.userService.getUsers(paginationParams, sort, filter);
  }

  @Roles(Role.ADMIN)
  @Post('')
  async createUser(
    @UserId() userId: string,
    @Body() userCreationDto: UserCreationDto,
  ): Promise<UserInfoDto> {
    return this.userService.createUser(userId, userCreationDto);
  }

  @Put('')
  async updateUser(
    @User() userPayload: AuthPayload,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<AccessToken> {
    return this.userService.updateUser(userPayload, updateUserDto);
  }

  @Put('/password')
  async changePassword(
    @User() userPayload: AuthPayload,
    @Body() newPasswordDto: PasswordChangeDto,
  ): Promise<UserInfoDto> {
    return await this.userService.updatePassword(userPayload, newPasswordDto);
  }
}
