export class CreateVotesDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  sessionId: string;
  choiceId: string;
  eventId: string;
}
