import { Votes } from '../../../../domain/votes';
import { VotesEntity } from '../entities/votes.entity';

export class VotesMapper {
  static toDomain(raw: VotesEntity): Votes {
    const domainEntity = new Votes();
    domainEntity.id = raw.id;
    domainEntity.deviceHash = raw.deviceHash;
    domainEntity.location = raw.location;
    domainEntity.choiceId = raw.choiceId;
    domainEntity.eventId = raw.eventId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Votes): VotesEntity {
    const persistenceEntity = new VotesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.deviceHash = domainEntity.deviceHash;
    persistenceEntity.location = domainEntity.location;
    persistenceEntity.choiceId = domainEntity.choiceId;
    persistenceEntity.eventId = domainEntity.eventId;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
