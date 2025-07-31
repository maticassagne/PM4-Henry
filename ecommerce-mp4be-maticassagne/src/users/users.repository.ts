import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [
    {
      id: Number,
      email: String,
      name: String,
      password: String,
      address: String,
      phone: String,
      country: String,
      city: String,
    },
    {
      id: 1,
      email: 'mail@mail.com',
      name: 'nombre1',
      password: 'asdasd',
      address: 'calle 144',
      phone: '221545454',
    },
  ];

  async getUsersFromRepository() {
    return this.users;
  }
}
