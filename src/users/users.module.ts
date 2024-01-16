import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { DatabaseModule } from 'src/database/prisma.module';

@Module({
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    DatabaseModule
  ]
})
export class UsersModule {}
