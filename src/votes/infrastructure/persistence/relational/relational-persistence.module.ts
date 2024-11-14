import { Module } from '@nestjs/common';
import { VotesRepository } from '../votes.repository';
import { VotesRelationalRepository } from './repositories/votes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesEntity } from './entities/votes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VotesEntity])],
  providers: [
    {
      provide: VotesRepository,
      useClass: VotesRelationalRepository,
    },
  ],
  exports: [VotesRepository],
})
export class RelationalVotesPersistenceModule {}
