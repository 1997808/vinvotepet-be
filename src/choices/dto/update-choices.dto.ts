// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateChoicesDto } from './create-choices.dto';

export class UpdateChoicesDto extends PartialType(CreateChoicesDto) {}
