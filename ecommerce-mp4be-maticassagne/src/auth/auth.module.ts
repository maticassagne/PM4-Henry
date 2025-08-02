import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
