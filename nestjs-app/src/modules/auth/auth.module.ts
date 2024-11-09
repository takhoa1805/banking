import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';

// eslint-disable-next-line @typescript-eslint/no-require-imports
// require('dotenv').config({ path: '../../../../.env' });

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  exports: ['IAuthService'],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
