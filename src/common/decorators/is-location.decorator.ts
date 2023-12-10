import {
  isEnum,
  isInt,
  isString,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { SectionRangeEnum, ShelfEnum } from '../enum';

export function IsLocation(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isLocation',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (!isString(value)) return false;
          const [shelf, section] = value.split('-');
          return (
            isEnum(shelf, ShelfEnum) &&
            isInt(+section) &&
            SectionRangeEnum.from <= +section &&
            +section <= SectionRangeEnum.to
          );
        },
        defaultMessage(): string {
          return 'Location not valid';
        },
      },
    });
  };
}
