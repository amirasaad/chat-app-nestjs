import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../../../src/users/users.service';
import { UsersServiceMock } from '../utils/users.service.mock';

describe('UsersService', () => {
  let service: UsersService;
  const users = [
    {
      email: 'test@test.com',
      _id: 1,
    },
  ];

  beforeEach(async () => {
    const UsersServiceProvider = {
      provide: UsersService,
      useValue: new UsersServiceMock(users),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersServiceProvider],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should define create method to save user to db', async () => {
    const savedUser = await service.create({
      email: 'test@test.com',
      password: 'p@$$W0rd',
    });
    expect(savedUser).toBeDefined();
  });
  it('should define findOne', async () => {
    expect(await service.findOneByEmail('test@test.com')).toHaveProperty(
      'email',
      'test@test.com',
    );
  });
});
