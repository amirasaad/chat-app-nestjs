import { UserDocument } from '../schemas/user.schema';

export interface IUser extends UserDocument {
  readonly email: string;
  readonly password: string;
}

export interface IUserInDB {
    _id: number,
    email: string
}