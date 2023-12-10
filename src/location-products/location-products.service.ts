import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LocationProductOrmEntity } from './entities/location-product.entity';
import { AddProductsDto, GetLocationProductQueryDto } from './dto/request.dto';
import { GetLocationProductRes } from './dto/response.dto';

@Injectable()
export class LocationProductsService {
  constructor(
    @InjectRepository(LocationProductOrmEntity)
    private locationProductsRepo: Repository<LocationProductOrmEntity>,
  ) {}

  async getLocationProduct({
    productId,
    quantity,
  }: GetLocationProductQueryDto) {
    const count = await this.locationProductsRepo.countBy({
      productId,
    });
    if (count < quantity) throw new BadRequestException();

    const locations = (await this.locationProductsRepo.query(`
        select location, count(productId) as count
        from location_products
        where productId = '${productId}'
        group by location
        order by count, location;`)) as GetLocationProductRes[];

    const res: GetLocationProductRes[] = [];
    for (const { location, count } of locations) {
      if (+count < quantity) {
        res.push({ location, count: +count });
        quantity -= +count;
      } else {
        res.push({ location, count: quantity });
        break;
      }
    }

    return res;
  }

  async addProducts({ location, productIds }: AddProductsDto) {
    for (const productId of productIds) {
      await this.locationProductsRepo.save({ location, productId });
    }
  }

  async deleteProducts({ location, productIds }: AddProductsDto) {
    const count = await this.locationProductsRepo.countBy({
      location,
      productId: In(productIds),
    });
    if (count < productIds.length) throw new BadRequestException();

    for (const productId of productIds) {
      const data = await this.locationProductsRepo.findOneBy({
        location,
        productId,
      });
      await this.locationProductsRepo.remove(data);
    }
  }
}
