import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../../../src/chat/chat.service';

const rooms = [{room_id: 1, name: 'Room#1', users: []}, {room_id: 2, name: 'Room#2', users: []}]
class ChatServiceMock {
  rooms = rooms
  async findAll() {
    return this.rooms
  }
  async findOne(room_id: number) {
    return this.rooms.find(room => room.room_id === room_id)
  }

  async join(room_id: number, user: any) {
    const room = await this.findOne(room_id);
    room.users.push(user)
    return {
      success: true,
      message: 'User is added to the room.'
    }
  }

}
describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const ChatServiceProvider = {
      provide: ChatService,
      useClass: ChatServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, ChatServiceProvider],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  describe('findOne', () => {
    it('should return a room by id if exists', async () => {
      const expected = rooms[0]
      const room = await service.findOne(1);
      expect(room).toEqual(expected)
    })
  })
  describe('findAll', () => {
    it('should return all rooms', async () => {
      const actual_rooms = await service.findAll();
      expect(actual_rooms).toEqual(rooms)
    })
  })

  describe('join', () => {
    it('should add a user to a chat room', async () => {
      const user = {email: 'test@test.com', _id: 1}
      const result = await service.join(1, user)
      expect(result).toEqual({success: true, message: 'User is added to the room.'})
    })
  })

});
