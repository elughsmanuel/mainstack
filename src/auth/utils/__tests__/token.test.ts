import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { createToken, generateToken } from '../token';

jest.mock('jsonwebtoken');

const mockResponse = {
  cookie: jest.fn(),
} as unknown as Response;

describe('Token Functions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a token for sign up', () => {
    const mockToken = 'mockedToken';
    (jwt.sign as jest.Mock).mockReturnValueOnce(mockToken);

    process.env.JWT_SECRET = 'yourSecret';
    process.env.JWT_EXPIRES_IN = '1h';
    process.env.JWT_COOKIE_EXPIRES_IN = '7';

    const token = createToken(mockResponse, 'userId123', 'user');

    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'userId123', role: 'user' }, 'yourSecret', { expiresIn: '1h' });
    expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', mockToken, expect.any(Object));
    expect(token).toBe(mockToken);
  });

  it('should generate a token for log in', () => {
    const mockToken = 'mockedToken';
    (jwt.sign as jest.Mock).mockReturnValueOnce(mockToken);

    process.env.JWT_SECRET = 'yourSecret';
    process.env.JWT_EXPIRES_IN = '1h';
    process.env.JWT_COOKIE_EXPIRES_IN = '7';

    const token = generateToken(mockResponse, 'userId123', 'user');

    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'userId123', role: 'user' }, 'yourSecret', { expiresIn: '1h' });
    expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', mockToken, expect.any(Object));
    expect(token).toBe(mockToken);
  });
});
