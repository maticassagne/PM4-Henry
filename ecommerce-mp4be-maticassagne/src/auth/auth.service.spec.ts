import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: Partial<UserRepository>;
  let jwtServiceMock: Partial<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            getUserByEmail: jest.fn(),
            addUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepositoryMock = module.get<UserRepository>(UserRepository);
    jwtServiceMock = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should call getUserByEmail on signin', async () => {
    (userRepositoryMock.getUserByEmail as jest.Mock).mockResolvedValue({
      email: 'test@test.com',
      password: await bcrypt.hash('password', 8),
    });
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    (jwtServiceMock.sign as jest.Mock).mockReturnValue('mockedToken');

    const result = await authService.signIn({
      email: 'test@test.com',
      password: 'password',
    });
    expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password',
    });
    expect(result.token).toBe('mockedToken');
  });
});
