import { VotingEvents } from '../../../../domain/voting-events';
import { VotingEventsEntity } from '../entities/voting-events.entity';

export class VotingEventsMapper {
  static toDomain(raw: VotingEventsEntity): VotingEvents {
    const domainEntity = new VotingEvents();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.startDate = raw.startDate;
    domainEntity.endDate = raw.endDate;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: VotingEvents): VotingEventsEntity {
    const persistenceEntity = new VotingEventsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.startDate = domainEntity.startDate;
    persistenceEntity.endDate = domainEntity.endDate;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
