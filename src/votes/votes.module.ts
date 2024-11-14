import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { RelationalVotesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalVotesPersistenceModule,
  ],
  controllers: [VotesController],
  providers: [VotesService],
  exports: [VotesService, RelationalVotesPersistenceModule],
})
export class VotesModule {}
