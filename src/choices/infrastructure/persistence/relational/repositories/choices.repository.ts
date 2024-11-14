import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Choices } from '../../../../domain/choices';
import { ChoicesRepository } from '../../choices.repository';
import { ChoicesEntity } from '../entities/choices.entity';
import { ChoicesMapper } from '../mappers/choices.mapper';

@Injectable()
export class ChoicesRelationalRepository implements ChoicesRepository {
  constructor(
    @InjectRepository(ChoicesEntity)
    private readonly choicesRepository: Repository<ChoicesEntity>,
  ) {}

  async create(data: Choices): Promise<Choices> {
    const persistenceModel = ChoicesMapper.toPersistence(data);
    const newEntity = await this.choicesRepository.save(
      this.choicesRepository.create(persistenceModel),
    );
    return ChoicesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Choices[]> {
    const entities = await this.choicesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ChoicesMapper.toDomain(entity));
  }

  async findById(id: Choices['id']): Promise<NullableType<Choices>> {
    const entity = await this.choicesRepository.findOne({
      where: { id },
    });

    return entity ? ChoicesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Choices['id'][]): Promise<Choices[]> {
    const entities = await this.choicesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ChoicesMapper.toDomain(entity));
  }

  async update(id: Choices['id'], payload: Partial<Choices>): Promise<Choices> {
    const entity = await this.choicesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.choicesRepository.save(
      this.choicesRepository.create(
        ChoicesMapper.toPersistence({
          ...ChoicesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ChoicesMapper.toDomain(updatedEntity);
  }

  async remove(id: Choices['id']): Promise<void> {
    await this.choicesRepository.delete(id);
  }
}
