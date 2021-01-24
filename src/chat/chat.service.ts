import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { IUserInDB } from '../users/interfaces/user';
import { RoomDto } from './dto/room';
import { IRoom, IJoinStatus } from './interfaces/room';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<IRoom>,
    private usersService: UsersService,
  ) {}

  async findOne(room_id: number): Promise<IRoom> {
    return await this.roomModel.findOne({ id: room_id }).exec();
  }

  async findAll(): Promise<Array<IRoom>> {
    return await this.roomModel.find({}).exec();
  }

  async join(room_id: number, user: IUserInDB): Promise<IJoinStatus> {
    const joinStatus: IJoinStatus = {
      success: true,
      message: 'User is added to the room.',
    };
    const room = await this.findOne(room_id);
    const db_user = await this.usersService.findOneByEmail(user.email);
    room.users.push(db_user);
    return joinStatus;
  }

  async create(roomDto: RoomDto): Promise<IRoom | undefined> {
    const room = new this.roomModel(roomDto);
    room.save().then((room) => {
      if (!room) {
        return undefined;
      }
    });
    return room;
  }
}
