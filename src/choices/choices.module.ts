import { Module } from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { ChoicesController } from './choices.controller';
import { RelationalChoicesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalChoicesPersistenceModule,
  ],
  controllers: [ChoicesController],
  providers: [ChoicesService],
  exports: [ChoicesService, RelationalChoicesPersistenceModule],
})
export class ChoicesModule {}
