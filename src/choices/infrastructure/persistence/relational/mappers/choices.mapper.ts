import { Choices } from '../../../../domain/choices';
import { ChoicesEntity } from '../entities/choices.entity';

export class ChoicesMapper {
  static toDomain(raw: ChoicesEntity): Choices {
    const domainEntity = new Choices();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.eventId = raw.eventId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Choices): ChoicesEntity {
    const persistenceEntity = new ChoicesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.eventId = domainEntity.eventId;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
