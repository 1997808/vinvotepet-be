export class CreateVotesDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  deviceHash: string;
  location: string;
  choiceId: string;
  eventId: string;
}
