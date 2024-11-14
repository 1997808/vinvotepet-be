import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { VotesEntity } from '../entities/votes.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Votes } from '../../../../domain/votes';
import { VotesRepository } from '../../votes.repository';
import { VotesMapper } from '../mappers/votes.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class VotesRelationalRepository implements VotesRepository {
  constructor(
    @InjectRepository(VotesEntity)
    private readonly votesRepository: Repository<VotesEntity>,
  ) {}

  async create(data: Votes): Promise<Votes> {
    const persistenceModel = VotesMapper.toPersistence(data);
    const newEntity = await this.votesRepository.save(
      this.votesRepository.create(persistenceModel),
    );
    return VotesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Votes[]> {
    const entities = await this.votesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => VotesMapper.toDomain(entity));
  }

  async findById(id: Votes['id']): Promise<NullableType<Votes>> {
    const entity = await this.votesRepository.findOne({
      where: { id },
    });

    return entity ? VotesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Votes['id'][]): Promise<Votes[]> {
    const entities = await this.votesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => VotesMapper.toDomain(entity));
  }

  async update(id: Votes['id'], payload: Partial<Votes>): Promise<Votes> {
    const entity = await this.votesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.votesRepository.save(
      this.votesRepository.create(
        VotesMapper.toPersistence({
          ...VotesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return VotesMapper.toDomain(updatedEntity);
  }

  async remove(id: Votes['id']): Promise<void> {
    await this.votesRepository.delete(id);
  }
}
