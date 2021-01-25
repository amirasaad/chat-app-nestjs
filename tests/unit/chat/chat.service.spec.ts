import { Test, TestingModule } from '@nestjs/testing';
import { IRoomType } from '../../../src/chat/interfaces/room';
import { ChatService } from '../../../src/chat/chat.service';
import { ChatServiceMock } from '../utils/chat.service.mock';

const rooms: Array<IRoomType> = [
  { id: 1, name: 'Room#1', users: [] },
  { id: 2, name: 'Room#2', users: [] },
];

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const ChatServiceProvider = {
      provide: ChatService,
      useValue: new ChatServiceMock(rooms),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, ChatServiceProvider],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  describe('findOne', () => {
    it('should return a room by id if exists', async () => {
      const expected = rooms[0];
      const room = await service.findOne(1);
      expect(room).toEqual(expected);
    });
  });
  describe('findAll', () => {
    it('should return all rooms', async () => {
      const actual_rooms = await service.findAll();
      expect(actual_rooms).toEqual(rooms);
    });
  });

  describe('join', () => {
    it('should add a user to a chat room', async () => {
      const user = { email: 'test@test.com', _id: 1 };
      const result = await service.join(1, user);
      expect(result).toEqual({
        success: true,
        message: 'User is added to the room.',
      });
      expect(rooms[0].users).toContain(user);
    });
  });
});
