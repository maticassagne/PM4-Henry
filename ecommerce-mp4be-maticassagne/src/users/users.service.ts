import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  getUsers(page: number, limit: number) {
    return this.userRepository.getAllUsers(page, limit);
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  addUser(user: User) {
    return this.userRepository.newUser(user);
  }

  updateUser(id: string, user: Partial<User>) {
    return this.userRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
