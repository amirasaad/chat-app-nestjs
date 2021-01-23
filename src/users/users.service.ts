import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IUser } from './interfaces/user';
import { ISignupStatus } from './interfaces/signup';
import { SignupDto } from './dto/signup.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async findAll() {
    return await this.userModel.find({});
  }
  async findOneByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async create(signupDto: SignupDto): Promise<ISignupStatus> {
    let status: ISignupStatus = {
      success: true,
      message: 'User signed up successfuly.',
    };
    const user = new this.userModel(signupDto);
    user.save().then((user) => {
      if (!user) {
        status.message = 'Error has been ocurred.'
        status.success = false
      }
    })
    return status;
  }
}
