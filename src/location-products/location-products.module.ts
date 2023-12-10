import { Module } from '@nestjs/common';
import { LocationProductsService } from './location-products.service';
import { LocationProductsController } from './location-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationProductOrmEntity } from './entities/location-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationProductOrmEntity])],
  controllers: [LocationProductsController],
  providers: [LocationProductsService],
})
export class LocationProductsModule {}
