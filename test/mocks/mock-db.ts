import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationProductOrmEntity } from '../../src/location-products/entities/location-product.entity';

export class MockDB {
  public ds: DataSource;
  public get module() {
    return TypeOrmModule.forRoot(this.ds.options);
  }

  constructor() {
    this.ds = new DataSource({
      type: 'postgres',
      synchronize: true,
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE_TEST,
      entities: [LocationProductOrmEntity],
    });
  }

  public async refreshDb(): Promise<void> {
    await this.ds.query(`DROP SEQUENCE IF EXISTS public_name_id_seq`);
    await this.ds.dropDatabase();
    await this.ds.synchronize();
  }
}

export const mockDB = new MockDB();
