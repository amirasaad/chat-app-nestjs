import { RoomDocument } from '../schemas/room';

export interface IRoom extends RoomDocument {
  id: number;
  name: string;
}

export interface IJoinStatus {
  success: boolean;
  message: string;
}
