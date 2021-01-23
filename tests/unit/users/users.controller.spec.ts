import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import * as mocks from 'node-mocks-http';
import { UsersService } from '../../../src/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const result = { message: 'User is signed up.', success: true};
  const res = mocks.createResponse();
  let usersService = {
    findOneByEmail: () => { email: 'test@test.com' },
    create: (signupDto) => result
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
    .useValue(usersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should create user', async () => {

      expect(await controller.signup(res, {email: 'test@test.com', password: 'test'})).toBe(result);
    });
  });
});
