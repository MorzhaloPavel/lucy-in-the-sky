import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export interface IBaseEntity {
  id: number;
  createdAt: Date;
}

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
}
