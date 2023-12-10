import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

interface ILocationProduct {
  location: string;
  productId: string;
}
@Entity('location_products')
export class LocationProductOrmEntity
  extends BaseEntity
  implements ILocationProduct
{
  @Column()
  location: string;

  @Column()
  productId: string;
}
