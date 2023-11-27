import request from 'supertest';
import app from '../app';

jest.spyOn(console, 'error').mockImplementation(() => {});
jest.spyOn(console, 'log').mockImplementation(() => {});

let server: any;

beforeAll((done) => {
  server = app.listen(8001, done);
});

afterAll((done) => {
  server.close(done);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GET /', () => {
  it('should respond with status 200 and a success message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: 'OK : Homepage',
    });
  });
});

describe('GET /api', () => {
  it('should respond with status 200 and a success message', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: 'OK : API',
    });
  });
});

describe('GET /api/v1', () => {
  it('should respond with status 200 and a success message', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: 'OK : API - v1',
    });
  });
});

describe('Non-existent Route', () => {
  it('should respond with status 404 and a "Not Found" message for a non-existent route', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      data: "Can't find /non-existent-route on this server.",
    });
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
