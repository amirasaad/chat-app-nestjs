import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as faker from 'faker';
import { ChatService } from '../../src/chat/chat.service';

describe('Chat', () => {
  let app: INestApplication;
  let chatService: ChatService;
  const room_id = 1;
  const fake_room_id = 'fake-room';
  const message = {
    body: 'This is a message',
    created: faker.date.recent()
  }
  const room_data = {
    name: 'Room#1'
  }
  let room;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    chatService = moduleRef.get<ChatService>(ChatService);
  });

  describe('POST /chat/join/{id}', () => {
    beforeEach(async () => {
      room = await chatService.create(room_data);
    });
    it('allows user to join a chat room given its id', (done) => {
      return request(app.getHttpServer()).post(`/chat/join/${room.id}`).expect(200);
    });
    it('return response with status code 404 for non-exiting room', (done) => {
      return request(app.getHttpServer()).post(`/chat/join/${fake_room_id}`).expect(404);
    });
  });

  describe('POST /chat/room/{id}', () => {
    it('add a message to given chat room id', () => {
      return request(app.getHttpServer())
        .post(`/chat/room/${room_id}`)
        .send(message)
        .expect(201)
    });
  });

  describe('GET /chat/rooms/', () => {
    it('should list all available rooms', () => {
      return request(app.getHttpServer())
      .get('/chat/rooms').expect(200)
    })
  })

  afterAll(async () => {
    await app.close();
  })
});
