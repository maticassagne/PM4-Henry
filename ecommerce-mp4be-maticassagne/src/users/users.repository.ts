import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.userRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con id ${id}`);
    }
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async newUser(user: User) {
    const newUser = await this.userRepository.save(user);
    const { password, ...userNoPassword } = newUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: Partial<User>) {
    await this.userRepository.update(id, user);
    const updateUser = await this.userRepository.findOneBy({ id });
    if (!updateUser) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    const { password, ...userNoPassword } = updateUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.userRepository.remove(user);
    return `Usuario con id ${id} eliminado exitosamente`;
  }

  async getUserByEmail(email: string) {
    const foundUser = await this.userRepository.findOneBy({ email });
    if (!foundUser) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado.`);
    }
    return foundUser;
  }
}
