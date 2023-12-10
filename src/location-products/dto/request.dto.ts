import { IsLocation } from '../../common/decorators/is-location.decorator';
import { IsProductIds } from '../../common/decorators/is-product-ids.decorator';
import { IsInt, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetLocationProductQueryDto {
  @IsProductIds()
  productId: string;

  @Transform(({ value }: { value: string }) => +value)
  @IsInt()
  @IsPositive()
  quantity: number;
}

export class AddProductsDto {
  @IsLocation()
  location: string;

  @IsProductIds()
  productIds: string[];
}

export class DeleteProductsDto extends AddProductsDto {}
