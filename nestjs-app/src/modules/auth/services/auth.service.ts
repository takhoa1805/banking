import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from '../../users/domains/dtos/requests/user-login.dto';
import { IUserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from '../domains/dtos/responses/access-token.dto';
import { hash, compare } from 'bcrypt';

export interface IAuthService {
  signIn(userLoginDto: UserLoginDto): Promise<AccessToken>;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, passwordHashed: string): Promise<boolean>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userLoginDto: UserLoginDto): Promise<AccessToken> {
    try {
      const user = await this.userService.getUserForAuth(userLoginDto);

      if (!user) {
        throw new UnauthorizedException();
      }

      const compare = await this.comparePassword(
        userLoginDto.password,
        user.password,
      );

      if (!compare) {
        throw new UnauthorizedException();
      }

      const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      };

      const token = await this.jwtService.signAsync(payload);

      return new AccessToken(token);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 13);
  }

  async comparePassword(
    password: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return await compare(password, passwordHashed);
  }
}
