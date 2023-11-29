import Unauthenticated from '../Unauthenticated';
import { StatusCodes } from 'http-status-codes';

describe('Unauthenticated Class', () => {
  it('should be an instance of Error', () => {
    const unauthenticatedError = new Unauthenticated('Unauthenticated');

    expect(unauthenticatedError).toBeInstanceOf(Error);
  });

  it('should have the correct name', () => {
    const unauthenticatedError = new Unauthenticated('Unauthenticated');

    expect(unauthenticatedError.name).toBe('Unauthenticated');
  });

  it('should have the correct status code', () => {
    const unauthenticatedError = new Unauthenticated('Unauthenticated');

    expect(unauthenticatedError.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });

  it('should have the correct message', () => {
    const errorMessage = 'Unauthenticated';
    const unauthenticatedError = new Unauthenticated(errorMessage);

    expect(unauthenticatedError.message).toBe(errorMessage);
  });

  it('should throw an error with the correct status code when caught', () => {
    try {
      throw new Unauthenticated('Unauthenticated');
    } catch (error: any) {
      expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    }
  });
});
