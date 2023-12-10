import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

export interface ILoggerRequest {
  endpoint: string;
  method: string;
  body: object;
  query: object;
  isError?: boolean;
  time?: string;
}

@Entity('logger_requests')
export class LoggerRequestOrmEntity
  extends BaseEntity
  implements ILoggerRequest
{
  @Column()
  endpoint: string;

  @Column()
  method: string;

  @Column({ type: 'json' })
  body: object;

  @Column({ type: 'json' })
  query: object;

  @Column({ default: false })
  isError: boolean;

  @Column({ nullable: true })
  time: string | null;
}
