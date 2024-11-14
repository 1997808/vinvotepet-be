import { Module } from '@nestjs/common';
import { VotingEventsService } from './voting-events.service';
import { VotingEventsController } from './voting-events.controller';
import { RelationalVotingEventsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalVotingEventsPersistenceModule,
  ],
  controllers: [VotingEventsController],
  providers: [VotingEventsService],
  exports: [VotingEventsService, RelationalVotingEventsPersistenceModule],
})
export class VotingEventsModule {}
