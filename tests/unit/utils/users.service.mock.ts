import { SignupDto } from '../../../src/users/dto/signup.dto';
import { IUserInDB } from '../../../src/users/interfaces/user';

export class UsersServiceMock {
  users: Array<IUserInDB>;
  constructor(users: Array<IUserInDB>) {
    this.users = users;
  }
  async findAll() {
    return this.users;
  }
  async findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async create(signupDto: SignupDto) {
    return { message: 'User is signed up.', success: true };
  }
}
