import { Injectable } from '@nestjs/common';

type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};

const users = [
  {
    id: '1',
    email: 'homer@springfield.com',
    name: 'Homer Simpson',
    password: "d'oh!",
    address: '742 Evergreen Terrace',
    phone: '555-0123',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '2',
    email: 'marge@springfield.com',
    name: 'Marge Simpson',
    password: 'bluehair',
    address: '742 Evergreen Terrace',
    phone: '555-0124',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '3',
    email: 'bart@springfield.com',
    name: 'Bart Simpson',
    password: 'eatmyshorts',
    address: '742 Evergreen Terrace',
    phone: '555-0125',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '4',
    email: 'lisa@springfield.com',
    name: 'Lisa Simpson',
    password: 'smartgirl',
    address: '742 Evergreen Terrace',
    phone: '555-0126',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '5',
    email: 'maggie@springfield.com',
    name: 'Maggie Simpson',
    password: 'pacifier',
    address: '742 Evergreen Terrace',
    phone: '555-0127',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '6',
    email: 'ned@springfield.com',
    name: 'Ned Flanders',
    password: 'okilydokily',
    address: '744 Evergreen Terrace',
    phone: '555-0128',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '7',
    email: 'moe@springfield.com',
    name: 'Moe Szyslak',
    password: 'divebar',
    address: "Moe's Tavern",
    phone: '555-0129',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '8',
    email: 'otto@springfield.com',
    name: 'Otto Mann',
    password: 'skoolbus',
    address: 'Springfield Elementary',
    phone: '555-0130',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '9',
    email: 'apu@springfield.com',
    name: 'Apu Nahasapeemapetilon',
    password: 'thankyoucomeagain',
    address: 'Kwik-E-Mart',
    phone: '555-0131',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '10',
    email: 'chief@springfield.com',
    name: 'Chief Wiggum',
    password: 'policechief',
    address: 'Springfield Police Station',
    phone: '555-0132',
    country: 'USA',
    city: 'Springfield',
  },
];

@Injectable()
export class UserRepository {
  async getAllUsers(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const userList = await users.slice(start, end);
    return userList.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string) {
    const foundUser = await users.find((user) => user.id === id);
    if (!foundUser) return `Usuario con id: ${id} no encontrado`;
    const { password, ...userNoPassword } = foundUser;
    return userNoPassword;
  }

  async newUser(user: any) {
    await users.push({ id: user.email, ...user });
    const newUser = users[users.length - 1];
    return newUser.id;
  }

  async updateUser(id: string, user: any) {
    const index = await users.findIndex((user) => user.id === id);
    if (index === -1) return 'Usuario no encontrado';
    users[index] = { ...users[index], ...user };
    return users[index].id;
  }

  async deleteUser(id: string) {
    const index = await users.findIndex((user) => user.id === id);
    if (index === -1) return 'Usuario no encontrado';
    await users.splice(index, 1);
    return id;
  }

  getUserByEmail(email: string) {
    return users.find((user) => user.email === email);
  }
}
