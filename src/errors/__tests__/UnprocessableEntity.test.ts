import UnprocessableEntity from '../UnprocessableEntity';
import { StatusCodes } from 'http-status-codes';

describe('UnprocessableEntity Class', () => {
  it('should be an instance of Error', () => {
    const unprocessableEntityError = new UnprocessableEntity('UnprocessableEntity');

    expect(unprocessableEntityError).toBeInstanceOf(Error);
  });

  it('should have the correct name', () => {
    const unprocessableEntityError = new UnprocessableEntity('UnprocessableEntity');

    expect(unprocessableEntityError.name).toBe('UnprocessableEntity');
  });

  it('should have the correct status code', () => {
    const unprocessableEntityError = new UnprocessableEntity('UnprocessableEntity');

    expect(unprocessableEntityError.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it('should have the correct message', () => {
    const errorMessage = 'UnprocessableEntity';
    const unprocessableEntityError = new UnprocessableEntity(errorMessage);

    expect(unprocessableEntityError.message).toBe(errorMessage);
  });

  it('should throw an error with the correct status code when caught', () => {
    try {
      throw new UnprocessableEntity('UnprocessableEntity');
    } catch (error: any) {
      expect(error.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    }
  });
});
