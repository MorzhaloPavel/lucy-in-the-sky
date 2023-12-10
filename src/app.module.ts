import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './db/db.module';
import { LocationProductsModule } from './location-products/location-products.module';
import { LoggerRequestsModule } from './logger-requests/logger-requests.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './common/middleware/logger.interceptor';
import { LoggerRequestsService } from './logger-requests/logger-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerRequestOrmEntity } from './logger-requests/entities/logger-requests.entity';
import { HttpExceptionFilter } from './common/exceptions/http-exception';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule,
    LocationProductsModule,
    LoggerRequestsModule,
    TypeOrmModule.forFeature([LoggerRequestOrmEntity]),
  ],
  controllers: [],
  providers: [
    LoggerRequestsService,
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
