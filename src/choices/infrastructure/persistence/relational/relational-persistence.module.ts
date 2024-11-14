import { Module } from '@nestjs/common';
import { ChoicesRepository } from '../choices.repository';
import { ChoicesRelationalRepository } from './repositories/choices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoicesEntity } from './entities/choices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChoicesEntity])],
  providers: [
    {
      provide: ChoicesRepository,
      useClass: ChoicesRelationalRepository,
    },
  ],
  exports: [ChoicesRepository],
})
export class RelationalChoicesPersistenceModule {}
