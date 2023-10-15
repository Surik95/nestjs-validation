import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipeObject implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    value.age = Number(value.age);
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
