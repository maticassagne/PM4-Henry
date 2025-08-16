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

    return users.map(({ password, ...userFiltered }) => userFiltered);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con id ${id}`);
    }
    const { password, isAdmin, ...userFiletered } = user;
    return userFiletered;
  }

  async newUser(user: User) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    const dbUser = await this.userRepository.findOneBy({ id: newUser.id });
    if (!dbUser)
      throw new NotFoundException(
        `Usuario de id ${newUser.id}, no se pudo recuperar de la base de datos`,
      );
    const { password, isAdmin, ...userFiletered } = dbUser;
    return userFiletered;
  }

  async updateUser(id: string, user: Partial<User>) {
    await this.userRepository.update(id, user);
    const updateUser = await this.userRepository.findOneBy({ id });
    if (!updateUser) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    const { password, isAdmin, ...userFiletered } = updateUser;
    return userFiletered;
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
    this.userRepository.find;
    if (!foundUser) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado.`);
    }
    const { password, isAdmin, ...userFiletered } = foundUser;
    return userFiletered;
  }

  async findUserByEmail(email: string) {
    const foundUser = await this.userRepository.findOneBy({ email });
    return foundUser;
  }
}
