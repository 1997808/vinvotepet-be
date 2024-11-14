// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateVotesDto } from './create-votes.dto';

export class UpdateVotesDto extends PartialType(CreateVotesDto) {}
