import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migration: ['dist/migration/*{.ts,.js}'],
  autoLoadEntities: true,
  logging: ['error'],
  // synchronize: true,
  // dropSchema: true,
};

export const typeOrmConfig = registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
