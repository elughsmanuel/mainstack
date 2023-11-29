import BadRequest from '../BadRequest';
import { StatusCodes } from 'http-status-codes';

describe('BadRequest Class', () => {
  it('should be an instance of Error', () => {
    const badRequestError = new BadRequest('Bad Request');

    expect(badRequestError).toBeInstanceOf(Error);
  });

  it('should have the correct name', () => {
    const badRequestError = new BadRequest('Bad Request');

    expect(badRequestError.name).toBe('BadRequest');
  });

  it('should have the correct status code', () => {
    const badRequestError = new BadRequest('Bad Request');

    expect(badRequestError.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('should have the correct message', () => {
    const errorMessage = 'This is a bad request';
    const badRequestError = new BadRequest(errorMessage);

    expect(badRequestError.message).toBe(errorMessage);
  });

  it('should throw an error with the correct status code when caught', () => {
    try {
      throw new BadRequest('Bad Request');
    } catch (error: any) {
      expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
    }
  });
});
