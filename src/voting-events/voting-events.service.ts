import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { VotingEvents } from './domain/voting-events';
import { CreateVotingEventsDto } from './dto/create-voting-events.dto';
import { UpdateVotingEventsDto } from './dto/update-voting-events.dto';
import { VotingEventsRepository } from './infrastructure/persistence/voting-events.repository';

@Injectable()
export class VotingEventsService {
  constructor(
    // Dependencies here
    private readonly votingEventsRepository: VotingEventsRepository,
  ) {}

  async create(createVotingEventsDto: CreateVotingEventsDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.votingEventsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...createVotingEventsDto,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.votingEventsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: VotingEvents['id']) {
    return this.votingEventsRepository.findById(id);
  }

  findByIds(ids: VotingEvents['id'][]) {
    return this.votingEventsRepository.findByIds(ids);
  }

  // findCurrentVotingEvent() {
  //   return this.votingEventsRepository.findCurrentVotingEvent();
  // }

  async update(
    id: VotingEvents['id'],

    updateVotingEventsDto: UpdateVotingEventsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.votingEventsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ...updateVotingEventsDto,
    });
  }

  remove(id: VotingEvents['id']) {
    return this.votingEventsRepository.remove(id);
  }
}
