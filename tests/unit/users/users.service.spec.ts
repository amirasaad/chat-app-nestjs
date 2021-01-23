import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../../../src/users/schemas/user.schema';
import { UsersService } from '../../../src/users/users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockUser = {
    email: 'test@test.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUser,
        },
      ],
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
