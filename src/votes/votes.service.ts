import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Votes } from './domain/votes';
import { CreateVotesDto } from './dto/create-votes.dto';
import { UpdateVotesDto } from './dto/update-votes.dto';
import { VotesRepository } from './infrastructure/persistence/votes.repository';

@Injectable()
export class VotesService {
  constructor(
    // Dependencies here
    private readonly votesRepository: VotesRepository,
  ) {}

  async create(createVotesDto: CreateVotesDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.votesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...createVotesDto,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.votesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Votes['id']) {
    return this.votesRepository.findById(id);
  }

  findByIds(ids: Votes['id'][]) {
    return this.votesRepository.findByIds(ids);
  }

  async update(
    id: Votes['id'],

    updateVotesDto: UpdateVotesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.votesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ...updateVotesDto,
    });
  }

  remove(id: Votes['id']) {
    return this.votesRepository.remove(id);
  }
}
