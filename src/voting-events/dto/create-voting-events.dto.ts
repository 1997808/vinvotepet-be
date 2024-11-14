export class CreateVotingEventsDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  name: string;
  startDate: Date;
  endDate: Date;
}
