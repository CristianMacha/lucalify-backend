import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/src/modules/**/infrastructure/**.schema{.ts,.js}'],
  migrations: [__dirname + '/migrations/**{.ts,.js}'],
  migrationsTableName: 'db_migrations',
});
