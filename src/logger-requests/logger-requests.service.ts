import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ILoggerRequest,
  LoggerRequestOrmEntity,
} from './entities/logger-requests.entity';

@Injectable()
export class LoggerRequestsService {
  constructor(
    @InjectRepository(LoggerRequestOrmEntity)
    private loggerRequestsRepo: Repository<LoggerRequestOrmEntity>,
  ) {}

  async log(data: ILoggerRequest) {
    await this.loggerRequestsRepo.save(data);
  }
}
