import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { VotingEvents } from '../../domain/voting-events';

export abstract class VotingEventsRepository {
  abstract create(
    data: Omit<VotingEvents, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<VotingEvents>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<VotingEvents[]>;

  abstract findById(
    id: VotingEvents['id'],
  ): Promise<NullableType<VotingEvents>>;

  abstract findByIds(ids: VotingEvents['id'][]): Promise<VotingEvents[]>;

  abstract update(
    id: VotingEvents['id'],
    payload: DeepPartial<VotingEvents>,
  ): Promise<VotingEvents | null>;

  abstract remove(id: VotingEvents['id']): Promise<void>;
}
