import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
