import {
  isArray,
  isInt,
  isString,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ProductIdRangeEnum } from '../enum';

export function IsProductIds(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isProductIds',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string | string[]) {
          if (!isArray(value)) value = [value];
          for (const productId of value) {
            if (!isString(productId)) return false;
            const id = productId
              .split(' ')
              .find((i) => i.startsWith('L'))
              ?.slice(1);

            if (
              !(
                id &&
                isInt(+id) &&
                ProductIdRangeEnum.from < +id &&
                +id < ProductIdRangeEnum.to
              )
            )
              return false;
          }
          return true;
        },
        defaultMessage(): string {
          return 'ProductId not valid';
        },
      },
    });
  };
}
