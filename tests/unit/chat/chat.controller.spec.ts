import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../../../src/chat/chat.service';
import { ChatController } from '../../../src/chat/chat.controller';
import { ChatServiceMock } from '../utils/chat.service.mock';
import { IRoomType } from '../../../src/chat/interfaces/room';

const rooms: Array<IRoomType> = [
  { id: 1, name: 'Room#1', users: [] },
  { id: 2, name: 'Room#2', users: [] },
];
describe('ChatController', () => {
  let controller: ChatController;

  beforeEach(async () => {
    const ChatServiceProvider = {
      provide: ChatService,
      useValue: new ChatServiceMock(rooms),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [ChatServiceProvider],
    }).compile();

    controller = module.get<ChatController>(ChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
