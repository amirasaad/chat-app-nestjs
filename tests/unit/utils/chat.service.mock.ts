import { IRoomType } from 'src/chat/interfaces/room';

export class ChatServiceMock {
  rooms: Array<IRoomType>;
  constructor(rooms: Array<IRoomType>) {
    this.rooms = rooms;
  }
  async findAll() {
    return this.rooms;
  }
  async findOne(room_id: number) {
    return this.rooms.find((room) => room.id === room_id);
  }

  async join(room_id: number, user: any) {
    const room = await this.findOne(room_id);
    room.users.push(user);
    return {
      success: true,
      message: 'User is added to the room.',
    };
  }
}
