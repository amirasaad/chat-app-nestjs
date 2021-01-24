import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../../../src/chat/chat.service';

class ChatServiceMock {
  rooms = [{room_id: 1, name: 'Room#1', users: []}, {room_id: 2, name: 'Room#2', users: []}]
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
      const expected = { room_id: 1, name: 'Room#1' }
      const room = await service.findOne(1);
      expect(room).toEqual(expected)
    })
  })
  describe('findAll', () => {
    it('should return all rooms', async () => {
      const rooms = await service.findAll();
      expect(rooms).toEqual([{room_id: 1, name: 'Room#1'}, {room_id: 2, name: 'Room#2'}])
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
