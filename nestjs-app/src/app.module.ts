import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
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
        entities: [],
        synchronize: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
