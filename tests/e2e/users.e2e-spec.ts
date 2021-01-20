import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Cats', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST users`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'rick@example.com', password: 'P@$$word' })
      .expect(201)
      .expect({
        email: 'rick@example.com',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
