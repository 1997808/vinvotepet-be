import { ApiProperty } from '@nestjs/swagger';

export class Choices {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
