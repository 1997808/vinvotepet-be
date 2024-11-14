import { Module } from '@nestjs/common';
import { VotingEventsRepository } from '../voting-events.repository';
import { VotingEventsRelationalRepository } from './repositories/voting-events.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotingEventsEntity } from './entities/voting-events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VotingEventsEntity])],
  providers: [
    {
      provide: VotingEventsRepository,
      useClass: VotingEventsRelationalRepository,
    },
  ],
  exports: [VotingEventsRepository],
})
export class RelationalVotingEventsPersistenceModule {}
