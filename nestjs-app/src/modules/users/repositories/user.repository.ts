import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domains/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserCreationDto } from '../domains/dtos/requests/user-creation.dto';
import { Pagination } from '../../../decorators/pagination-params.decorator';
import { Sorting } from '../../../decorators/sorting-params.decorator';
import { Filtering } from '../../../decorators/filtering-params.decorator';
import { PaginatedResource } from '../../common/types/paginated-resource.dto';
import { getOrder, getWhere } from '../../../helpers/typeorm.helper';

export interface IUserRepository {
  findUserByUsername(
    username: string,
    relations?: string[],
  ): Promise<UserEntity | null>;
  findUserById(id: string, relations?: string[]): Promise<UserEntity | null>;
  findUsers(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ): Promise<PaginatedResource<UserEntity>>;
  createUser(
    userId: string,
    userCreationDto: UserCreationDto,
  ): Promise<UserEntity | null>;
  updateUser(userId: string, newUser: UserEntity): Promise<UserEntity | null>;
  updatePassword(
    userId: string,
    newUser: UserEntity,
  ): Promise<UserEntity | null>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserByUsername(
    username: string,
    relations?: string[],
  ): Promise<UserEntity | null> {
    const user = this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: relations,
    });

    return user;
  }

  async findUserById(
    id: string,
    relations?: string[],
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },

      relations: relations,
    });

    return user;
  }

  async findUsers(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ): Promise<PaginatedResource<UserEntity>> {
    const { page, limit, size, offset } = paginationParams;
    const where = getWhere(filter);
    const order = getOrder(sort);

    const [users, total] = await this.userRepository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      items: users,
      page,
      size,
    };
  }

  async createUser(
    userId: string,
    userCreationDto: UserCreationDto,
  ): Promise<UserEntity | null> {
    const newUser = this.userRepository.save({
      ...userCreationDto,
      createdBy: userId,
    });

    return newUser;
  }

  async updateUser(
    userId: string,
    newUser: UserEntity,
  ): Promise<UserEntity | null> {
    const updateUser = this.userRepository.save({
      ...newUser,
      updatedBy: userId,
    });

    return updateUser;
  }

  async updatePassword(
    userId: string,
    newUser: UserEntity,
  ): Promise<UserEntity | null> {
    const updateUser = this.userRepository.save({
      ...newUser,
      updatedBy: userId,
    });

    return updateUser;
  }
}
