import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { UserRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    protected readonly jwtService: JwtService,
  ) {}

  getAuth() {
    return `Todos los auth`;
  }

  async signIn(credentials: LoginUserDto) {
    const { email, password } = credentials;
    const foundUser = await this.userRepository.findUserByEmail(email);
    if (!foundUser) throw new BadRequestException('Credenciales incorrectas');

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword)
      throw new BadRequestException('Credenciales incorrectas');

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
      name: foundUser.name,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario logeado con exito.',
      token,
    };
  }

  async signUp(user: CreateUserDto) {
    const { email, password } = user;

    if (!email || !password)
      throw new BadRequestException(
        'El mail y la contraseña son obligatorios.',
      );
    const foundUser = await this.userRepository.findUserByEmail(email);
    if (foundUser) {
      throw new BadRequestException(
        `El email ${email} ya se encuentra registrado.`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    if (!hashedPassword)
      throw new BadRequestException('Error al hashear password');

    return await this.userRepository.newUser({
      ...user,
      password: hashedPassword,
    });
  }
}
