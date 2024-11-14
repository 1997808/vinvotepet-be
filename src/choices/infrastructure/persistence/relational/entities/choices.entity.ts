import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { VotingEventsEntity } from '../../../../../voting-events/infrastructure/persistence/relational/entities/voting-events.entity';

@Entity({
  name: 'choices',
})
export class ChoicesEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => VotingEventsEntity, (votingEvent) => votingEvent.choices)
  event: VotingEventsEntity;

  @Column()
  eventId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
