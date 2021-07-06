import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Password should contain atleast 8 letters.',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
            return typeof value === 'string' && value.length >= 8;
        },
      },
    });
  };
}