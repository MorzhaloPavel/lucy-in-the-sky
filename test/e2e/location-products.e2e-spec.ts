import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { LocationProductsService } from '../../src/location-products/location-products.service';
import { mockDB } from '../mocks/mock-db';
import { LocationProductsModule } from '../../src/location-products/location-products.module';
import * as request from 'supertest';

describe('Location products', () => {
  let app: INestApplication;
  const mockLocationProductsService = createMock<LocationProductsService>();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [mockDB.module, LocationProductsModule],
    })
      .overrideProvider(DataSource)
      .useValue(mockDB.ds)
      .overrideProvider(LocationProductsService)
      .useValue(mockLocationProductsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Test added and deleted product from location.', () => {
    const location = 'BB-3';
    const productIds = ['L42321 SM'];

    request(app.getHttpServer())
      .post('/location-products')
      .send({ location, productIds })
      .expect(201);

    request(app.getHttpServer())
      .get('/location-products')
      .query({ location, quantity: productIds.length })
      .expect(200);

    request(app.getHttpServer())
      .delete('/location-products')
      .send({ location, productIds })
      .expect(200);

    return request(app.getHttpServer())
      .get('/location-products')
      .query({ location, quantity: productIds.length })
      .expect(403);
  });

  afterAll(async () => {
    await app.close();
  });
});
