import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Blog Platform API E2E Tests', () => {
  let app: INestApplication;
  let token: string;
  let postId: number;

  const email = `test${Date.now()}@test.com`;
  const password = '123456';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(201);

    expect(res.body.message).toBe('User registered');
    expect(res.body.userId).toBeDefined();
  });

  it('should not register duplicate email', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(400);
  });

  it('should login user and return JWT token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201);

    expect(res.body.access_token).toBeDefined();
    token = res.body.access_token;
  });

  it('should reject login with wrong password', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: 'wrongpassword' })
      .expect(401);
  });

  it('should create a post with token', async () => {
    const res = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog Post',
        content: 'This is test content',
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('Test Blog Post');
    postId = res.body.id;
  });

  it('should reject creating post without token', async () => {
    await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'No Token Post',
        content: 'Should fail',
      })
      .expect(401);
  });

  it('should get all posts', async () => {
    const res = await request(app.getHttpServer())
      .get('/posts')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get one post by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/posts/${postId}`)
      .expect(200);

    expect(res.body.id).toBe(postId);
  });

  it('should return 404 for missing post', async () => {
    await request(app.getHttpServer())
      .get('/posts/999999')
      .expect(404);
  });

  it('should update a post with token', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Blog Post',
      })
      .expect(200);

    expect(res.body.title).toBe('Updated Test Blog Post');
  });

  it('should reject updating post without token', async () => {
    await request(app.getHttpServer())
      .patch(`/posts/${postId}`)
      .send({
        title: 'Should Not Update',
      })
      .expect(401);
  });

  it('should delete a post with token', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.message).toBe('Post deleted');
  });

  it('should return 404 after deleting post', async () => {
    await request(app.getHttpServer())
      .get(`/posts/${postId}`)
      .expect(404);
  });
});