import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domains/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserCreationDto } from '../domains/dtos/requests/user-creation.dto';

export interface IUserRepository {
  findUserByUsername(username: string): Promise<UserEntity | null>;
  findUserById(id: string): Promise<UserEntity | null>;
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

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    const user = this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    return user;
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return user;
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
