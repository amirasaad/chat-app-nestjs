import { IUser, IUserInDB } from '../../users/interfaces/user';
import { RoomDocument } from '../schemas/room';

export interface IRoom extends RoomDocument {
  id: number;
  name: string;
}

export interface IJoinStatus {
  success: boolean;
  message: string;
}

export interface IRoomType {
  id: number;
  name: string;
  users: Array<IUserInDB>;
}
