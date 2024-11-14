import { ApiProperty } from '@nestjs/swagger';

export class VotingEvents {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
