import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  getAuth() {
    return `Todos los auth`;
  }

  async signIn(email: string, password: string) {
    if (!email || !password) return 'Credenciales incorrectas';
    const user = await this.userRepository.getUserByEmail(email);
    if (!user || user.password !== password) return 'Credenciales incorrectas';
    return 'Usuario logeado con exito (TOKEN)';
  }
}
