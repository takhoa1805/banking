import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthService } from '../services/auth.service';
import { UserLoginDto } from '../../users/domains/dtos/requests/user-login.dto';
import { AccessToken } from '../domains/dtos/responses/access-token.dto';
import { PublicRoute } from '../../../decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @PublicRoute()
  @Post('login')
  signIn(@Body() userLoginDto: UserLoginDto): Promise<AccessToken> {
    return this.authService.signIn(userLoginDto);
  }
}
