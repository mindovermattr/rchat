import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import Ajv, { type ValidateFunction } from 'ajv';
import { getSchema } from './openapi-spec';

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  coerceTypes: true,
});

ajv.addKeyword('example');

@Injectable()
export class OpenApiValidationPipe implements PipeTransform {
  private readonly validator: ValidateFunction;

  constructor(schemaName: string) {
    this.validator = ajv.compile(getSchema(schemaName));
  }

  transform(value: unknown): unknown {
    const valid = this.validator(value);
    if (!valid) {
      throw new BadRequestException(
        ajv.errorsText(this.validator.errors, { separator: '; ' }),
      );
    }
    return value;
  }
}
