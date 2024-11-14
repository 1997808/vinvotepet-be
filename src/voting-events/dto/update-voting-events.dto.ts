// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateVotingEventsDto } from './create-voting-events.dto';

export class UpdateVotingEventsDto extends PartialType(CreateVotingEventsDto) {}
