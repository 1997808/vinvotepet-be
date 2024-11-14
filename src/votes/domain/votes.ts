import { ApiProperty } from '@nestjs/swagger';

export class Votes {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  deviceHash: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  choiceId: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
