import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { addTransactionalDataSource, deleteDataSourceByName, getDataSourceByName } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        UserModule,
        ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'default',
        type: 'mysql',
        host: configService.get<string>('MYSQLDB_HOST'),
        port: configService.get<number>('MYSQLDB_LOCAL_PORT'),
        username: configService.get<string>('MYSQLDB_USER'),
        password: configService.get<string>('MYSQLDB_PASSWORD'),
        database: configService.get<string>('MYSQLDB_DATABASE'),
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

        console.log(options);

        return Promise.resolve(addTransactionalDataSource(new DataSource(options)));
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
