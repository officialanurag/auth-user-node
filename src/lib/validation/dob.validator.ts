import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsDOB(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsDOB',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Enter dob in this format: yyyy/mm/dd',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
            const regex = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/;    
            if (typeof value === 'string' && regex.test(value)) {
                if (parseInt(value.split('/')[2]) <= 31) {
                    return true;
                }
            }
            return false;
        },
      },
    });
  };
}