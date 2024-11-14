import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Choices } from '../../domain/choices';

export abstract class ChoicesRepository {
  abstract create(
    data: Omit<Choices, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Choices>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Choices[]>;

  abstract findById(id: Choices['id']): Promise<NullableType<Choices>>;

  abstract findByIds(ids: Choices['id'][]): Promise<Choices[]>;

  abstract update(
    id: Choices['id'],
    payload: DeepPartial<Choices>,
  ): Promise<Choices | null>;

  abstract remove(id: Choices['id']): Promise<void>;
}
