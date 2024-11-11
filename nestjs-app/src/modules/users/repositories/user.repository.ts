import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from '../domains/dtos/requests/user-login.dto';
import { UserEntity } from '../domains/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

export interface IUserRepository {
  findUserForAuth(userLoginDto: UserLoginDto): Promise<UserEntity | null>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserForAuth(
    userLoginDto: UserLoginDto,
  ): Promise<UserEntity | null> {
    const user = this.userRepository.findOne({
      where: {
        username: userLoginDto.username,
      },
    });

    return user;
  }
}
