import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Votes } from '../../domain/votes';

export abstract class VotesRepository {
  abstract create(
    data: Omit<Votes, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Votes>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Votes[]>;

  abstract findById(id: Votes['id']): Promise<NullableType<Votes>>;

  abstract findByIds(ids: Votes['id'][]): Promise<Votes[]>;

  abstract update(
    id: Votes['id'],
    payload: DeepPartial<Votes>,
  ): Promise<Votes | null>;

  abstract remove(id: Votes['id']): Promise<void>;
}
