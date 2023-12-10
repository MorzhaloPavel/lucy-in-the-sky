import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: +configService.getOrThrow('MYSQL_PORT'),
        username: configService.getOrThrow('MYSQL_USER'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
        synchronize: true,
        migrationsRun: true,
        migrations: [join(__dirname, './migrations/*{.ts,.js}')],
        migrationsTableName: 'migrations',
        cli: { migrationsDir: 'src/migrations' },
        logging: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
