import { DataSource, type DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';

require('dotenv').config({ path: '../.env' });

const option: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.MYSQLDB_HOST,
    port: Number(process.env.MYSQLDB_LOCAL_PORT),
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    synchronize: false,
    entities: [
        __dirname + '/src/**/*.entity.{ts,js}',
        __dirname + 'src/modules/**/**/entities/*.entity{.ts,.js}',
        __dirname + 'src/modules/**/*.view-entity{.ts,.js}',
      ], 
    migrations: ['src/migrations/*{.ts,.js}'],
    migrationsRun: false,
}

export const dataSource = new DataSource(option);