import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VotesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  choiceId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
