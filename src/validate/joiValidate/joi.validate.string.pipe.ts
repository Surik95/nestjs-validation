import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AlternativesSchema } from 'joi';

@Injectable()
export class JoiValidationPipeString implements PipeTransform {
  constructor(private schema: AlternativesSchema<any>) {}

  transform(value: any) {
    const { error } = this.schema.validate(Number(value));
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
