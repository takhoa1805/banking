import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from '../../users/domains/dtos/requests/user-login.dto';
import { IUserService } from 'src/modules/users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from '../domains/dtos/responses/access-token.dto';

export interface IAuthService {
  signIn(userLoginDto: UserLoginDto): Promise<AccessToken>;
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

      const payload = { ...user };
      console.log(payload);
      const token = await this.jwtService.signAsync(payload);

      return new AccessToken(token);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log(error);
        throw new InternalServerErrorException(error);
      }
    }
  }
}
