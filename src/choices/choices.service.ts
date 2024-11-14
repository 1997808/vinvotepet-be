import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Choices } from './domain/choices';
import { CreateChoicesDto } from './dto/create-choices.dto';
import { UpdateChoicesDto } from './dto/update-choices.dto';
import { ChoicesRepository } from './infrastructure/persistence/choices.repository';

@Injectable()
export class ChoicesService {
  constructor(
    // Dependencies here
    private readonly choicesRepository: ChoicesRepository,
  ) {}

  async create(createChoicesDto: CreateChoicesDto) {
    // Do not remove comment below.
    // <creating-property />
    console.log(createChoicesDto, '===================');

    return this.choicesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...createChoicesDto,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.choicesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Choices['id']) {
    return this.choicesRepository.findById(id);
  }

  findByIds(ids: Choices['id'][]) {
    return this.choicesRepository.findByIds(ids);
  }

  async update(
    id: Choices['id'],

    updateChoicesDto: UpdateChoicesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.choicesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ...updateChoicesDto,
    });
  }

  remove(id: Choices['id']) {
    return this.choicesRepository.remove(id);
  }
}
