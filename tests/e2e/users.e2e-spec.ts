import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe(`POST /users`, () => {
    it('should return response with status code 201 for valid input', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ email: 'rick@example.com', password: 'P@$$word' })
        .expect(201)
        .expect({
          email: 'rick@example.com',
        });
    });
    it('should return response with status code 400 for invalid email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ email: 'rick', password: 'P@$$word' })
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: ['email must be an email'],
        });
    });
    it('should return response with status code 400 for empty password', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ email: 'morty@example.com' })
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'password must be longer than or equal to 6 characters',
            'password should not be empty',
          ],
          error: 'Bad Request',
        });
    });
    it('should return response with status code 400 for invalid password', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ email: 'morty@example.com', password: '123' })
        .expect(400)
        .expect({
          statusCode: 400,
          message: ['password must be longer than or equal to 6 characters'],
          error: 'Bad Request',
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should return response with code 201 created and jwt access_token in payload body for vaild creds', (done) => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'morty@example.com', password: 'P@$$w0rd' })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('access_token');
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('GET /users/me', () => {

    it('should return response with code 401 Unauthorized if user is not logged in', (done) => {
      return request(app.getHttpServer())
        .get('/users/me')
        .expect(401)
        .then((response) => {
          expect(response.body.message).toEqual('Unauthorized');
          done();
        })
        .catch((err) => done(err));
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
