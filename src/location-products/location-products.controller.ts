import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { LocationProductsService } from './location-products.service';
import {
  AddProductsDto,
  DeleteProductsDto,
  GetLocationProductQueryDto,
} from './dto/request.dto';

@Controller('location-products')
export class LocationProductsController {
  constructor(private readonly service: LocationProductsService) {}

  @Get()
  async getLocationProduct(@Query() dto: GetLocationProductQueryDto) {
    return await this.service.getLocationProduct(dto);
  }

  @Post()
  async addProducts(@Body() dto: AddProductsDto) {
    return this.service.addProducts(dto);
  }

  @Delete()
  async deleteProducts(@Body() dto: DeleteProductsDto) {
    return this.service.deleteProducts(dto);
  }
}
