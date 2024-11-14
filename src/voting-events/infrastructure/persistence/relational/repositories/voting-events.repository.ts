import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { VotingEventsEntity } from '../entities/voting-events.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { VotingEvents } from '../../../../domain/voting-events';
import { VotingEventsRepository } from '../../voting-events.repository';
import { VotingEventsMapper } from '../mappers/voting-events.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class VotingEventsRelationalRepository
  implements VotingEventsRepository
{
  constructor(
    @InjectRepository(VotingEventsEntity)
    private readonly votingEventsRepository: Repository<VotingEventsEntity>,
  ) {}

  async create(data: VotingEvents): Promise<VotingEvents> {
    const persistenceModel = VotingEventsMapper.toPersistence(data);
    const newEntity = await this.votingEventsRepository.save(
      this.votingEventsRepository.create(persistenceModel),
    );
    return VotingEventsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<VotingEvents[]> {
    const entities = await this.votingEventsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => VotingEventsMapper.toDomain(entity));
  }

  async findById(id: VotingEvents['id']): Promise<NullableType<VotingEvents>> {
    const entity = await this.votingEventsRepository.findOne({
      where: { id },
    });

    return entity ? VotingEventsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: VotingEvents['id'][]): Promise<VotingEvents[]> {
    const entities = await this.votingEventsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => VotingEventsMapper.toDomain(entity));
  }

  async update(
    id: VotingEvents['id'],
    payload: Partial<VotingEvents>,
  ): Promise<VotingEvents> {
    const entity = await this.votingEventsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.votingEventsRepository.save(
      this.votingEventsRepository.create(
        VotingEventsMapper.toPersistence({
          ...VotingEventsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return VotingEventsMapper.toDomain(updatedEntity);
  }

  async remove(id: VotingEvents['id']): Promise<void> {
    await this.votingEventsRepository.delete(id);
  }
}