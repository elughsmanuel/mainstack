import Joi from 'joi';
import { 
    VALIDATION_ERROR,
    UNIQUE_EMAIL,
    UNIQUE_USERNAME,
    UNIQUE_CONSTRAINT,
 } from '../auth/constants';

export const schemaErrorHandler = (error: any) => {
    if (error instanceof Joi.ValidationError) {
        const firstError = error.details[0];
        return firstError ? firstError.message : VALIDATION_ERROR;
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];

        if (field === 'email') {
            return UNIQUE_EMAIL;
        } else if (field === 'username') {
            return UNIQUE_USERNAME;
        } else {
            return UNIQUE_CONSTRAINT;
        }
    }

    return null;
};
