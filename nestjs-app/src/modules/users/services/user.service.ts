import {
  Injectable,
  Inject,
  InternalServerErrorException,
  ConflictException,
  HttpException,
  forwardRef,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UserInfoDto } from '../domains/dtos/responses/user-info.dto';
import { IUserRepository } from '../repositories/user.repository';
import { UserCreationDto } from '../domains/dtos/requests/user-creation.dto';
import { IAuthService } from '../../auth/services/auth.service';
import { UserUpdateDto } from '../domains/dtos/requests/user-update.dto';
import { AccessToken } from '../../auth/domains/dtos/responses/access-token.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordChangeDto } from '../domains/dtos/requests/password-change.dto';
import { UserEntity } from '../domains/entities/user.entity';
import { AuthPayload } from '../../auth/domains/interfaces/auth-payload.interface';

export interface IUserService {
  getUserByUsername(username: string): Promise<UserInfoDto | null>;
  getUserById(id: string): Promise<UserEntity>;
  createUser(
    userId: string,
    userCreationDto: UserCreationDto,
  ): Promise<UserInfoDto>;
  updateUser(
    userPayload: AuthPayload,
    userUpdateDto: UserUpdateDto,
  ): Promise<AccessToken>;
  updatePassword(
    userPayload: AuthPayload,
    newPasswordDto: PasswordChangeDto,
  ): Promise<UserInfoDto>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject(forwardRef(() => 'IAuthService'))
    private readonly authService: IAuthService,
    private jwtService: JwtService,
  ) {}

  async getUserByUsername(username: string): Promise<UserInfoDto | null> {
    try {
      const userEntity = await this.userRepository.findUserByUsername(username);

      if (!userEntity) {
        return null;
      } else {
        return new UserInfoDto(userEntity);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findUserById(id);

      if (!user) {
        throw new NotFoundException('Not found user');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createUser(
    userId: string,
    userCreationDto: UserCreationDto,
  ): Promise<UserInfoDto> {
    try {
      const isUsernameExist = await this.userRepository.findUserByUsername(
        userCreationDto.username,
      );
      if (isUsernameExist) {
        throw new ConflictException('Username exists');
      }

      const hashedPassword = await this.authService.hashPassword(
        userCreationDto.password,
      );
      const newUserInfo = new UserCreationDto(
        userCreationDto.name,
        userCreationDto.username,
        hashedPassword,
        userCreationDto.role,
        userCreationDto.email,
      );
      const newUser = await this.userRepository.createUser(userId, newUserInfo);

      if (!newUser) {
        throw new ConflictException('Cannot create new user');
      }

      return new UserInfoDto(newUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Cannot create new user');
      }
    }
  }

  async updateUser(
    userPayload: AuthPayload,
    userUpdateDto: UserUpdateDto,
  ): Promise<AccessToken> {
    try {
      if (userPayload.role === 'ADMIN') {
        const isUsernameExist = await this.userRepository.findUserByUsername(
          userUpdateDto.username,
        );
        if (isUsernameExist && isUsernameExist?.id !== userUpdateDto.id) {
          throw new ConflictException('Username exists');
        }

        const user = isUsernameExist
          ? { ...isUsernameExist }
          : await this.getUserById(userUpdateDto.id);

        const updateInfo = {
          ...user,
          ...userUpdateDto,
        };

        const updateUser = await this.userRepository.updateUser(
          userPayload.id,
          updateInfo,
        );

        const payload = {
          id: updateUser.id,
          name: updateUser.name,
          username: updateUser.username,
          role: updateUser.role,
        };

        const token = await this.jwtService.signAsync(payload);

        return new AccessToken(token);
      } else {
        if (userPayload.id !== userUpdateDto.id) {
          throw new ForbiddenException();
        } else {
          const isUsernameExist = await this.userRepository.findUserByUsername(
            userUpdateDto.username,
          );
          if (isUsernameExist && isUsernameExist?.id !== userUpdateDto.id) {
            throw new ConflictException('Username exists');
          }

          const user = isUsernameExist
            ? { ...isUsernameExist }
            : await this.getUserById(userUpdateDto.id);

          const updateInfo = {
            ...user,
            ...userUpdateDto,
          };

          const updateUser = await this.userRepository.updateUser(
            userPayload.id,
            updateInfo,
          );

          const payload = {
            id: updateUser.id,
            name: updateUser.name,
            username: updateUser.username,
            role: updateUser.role,
          };

          const token = await this.jwtService.signAsync(payload);

          return new AccessToken(token);
        }
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log(error);
        throw new InternalServerErrorException(
          'Cannot update user information',
        );
      }
    }
  }

  async updatePassword(
    userPayload: AuthPayload,
    newPasswordDto: PasswordChangeDto,
  ): Promise<UserInfoDto> {
    try {
      if (userPayload.role === 'ADMIN') {
        const user = await this.getUserById(newPasswordDto.id);

        const newHashedPassword = await this.authService.hashPassword(
          newPasswordDto.password,
        );

        const updateInfo = { ...user, password: newHashedPassword };

        const updatedUser = await this.userRepository.updatePassword(
          userPayload.id,
          updateInfo,
        );

        return new UserInfoDto(updatedUser);
      } else {
        if (userPayload.id !== newPasswordDto.id) {
          throw new ForbiddenException();
        } else {
          const user = await this.getUserById(newPasswordDto.id);

          const newHashedPassword = await this.authService.hashPassword(
            newPasswordDto.password,
          );

          const updateInfo = { ...user, password: newHashedPassword };

          const updatedUser = await this.userRepository.updatePassword(
            userPayload.id,
            updateInfo,
          );

          return new UserInfoDto(updatedUser);
        }
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
