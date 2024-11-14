import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async run() {
    const countUser = await this.repository.count();

    if (!countUser) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          email: 'john.doe@example.com',
          password,
        }),
      );
    }
  }
}
