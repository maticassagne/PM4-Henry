import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  getUsers() {
    return this.userRepository.getUsersFromRepository();
  }
}
