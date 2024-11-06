import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
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
          __dirname + '/src/**/*.entity.{ts,js}',
          __dirname + 'src/modules/**/**/entities/*.entity{.ts,.js}',
          __dirname + 'src/modules/**/*.view-entity{.ts,.js}',
        ],
        migrations: [__dirname + 'src/migrations/*{.ts,.js}'],
        logging: true,
        synchronize: false,
        migrationsRun: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
