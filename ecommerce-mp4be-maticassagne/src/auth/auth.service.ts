import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth() {
    return `Todos los auth`;
  }
}
