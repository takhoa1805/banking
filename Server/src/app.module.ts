import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/services/guards/auth.guard';
import { RolesGuard } from './modules/auth/services/guards/roles.guard';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LoanModule } from './modules/loans/loan.module';
import { AccountModule } from './modules/accounts/account.module';
import { TransactionModule } from './modules/transactions/transaction.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    LoanModule,
    AccountModule,
    TransactionModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'default',
        type: 'postgres',
        host: configService.get<string>('POSTGRESQLDB_HOST'),
        port: configService.get<number>('POSTGRESQLDB_LOCAL_PORT'),
        username: configService.get<string>('POSTGRESQLDB_USER'),
        password: configService.get<string>('POSTGRESQLDB_PASSWORD'),
        database: configService.get<string>('POSTGRESQLDB_DATABASE'),
        namingStrategy: new SnakeNamingStrategy(),
        entities: [
          __dirname + '/**/*.entity.{ts,js}',
          __dirname + '/modules/**/**/entities/*.entity{.ts,.js}',
          __dirname + '/modules/**/*.view-entity{.ts,.js}',
        ],
        migrations: [__dirname + 'src/migrations/*{.ts,.js}'],
        logging: true,
        synchronize: false,
        migrationsRun: false,
      }),
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid Options Passed');
        }

        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
