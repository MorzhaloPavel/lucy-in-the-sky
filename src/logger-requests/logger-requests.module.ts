import { Module } from '@nestjs/common';
import { LoggerRequestsService } from './logger-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerRequestOrmEntity } from './entities/logger-requests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoggerRequestOrmEntity])],
  providers: [LoggerRequestsService],
  exports: [LoggerRequestsService],
})
export class LoggerRequestsModule {}
