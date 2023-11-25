import Joi from "joi";
import {
    FIRST_NAME_REQUIRED,
    LAST_NAME_REQUIRED,
    EMAIL_REQUIRED,
    USERNAME_REQUIRED,
    ROLE_REQUIRED,
    PASSWORD_REQUIRED,
    VALID_EMAIL,
    VALID_PASSWORD,
    CONFIRM_PASSWORD_REQUIRED,
    MATCHING_PASSWORD,
    EMPTY_CONFIRM_PASSWORD,
    EMPTY_EMAIL,
    EMPTY_FIRST_NAME,
    EMPTY_LAST_NAME,
    EMPTY_PASSWORD,
    EMPTY_USERNAME,
    EMPTY_ROLE,
} from "./constants";

export const signUpSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
        "any.required": FIRST_NAME_REQUIRED,
        "string.empty": EMPTY_FIRST_NAME,
    }),
    lastName: Joi.string().trim().required().messages({
        "any.required": LAST_NAME_REQUIRED,
        "string.empty": EMPTY_LAST_NAME,
    }),
    email: Joi.string().trim().email().required().lowercase().messages({
        "any.required": EMAIL_REQUIRED,
        "string.empty": EMPTY_EMAIL,
        "string.email": VALID_EMAIL,
    }),
    username: Joi.string().trim().required().messages({
        "any.required": USERNAME_REQUIRED,
        "string.empty": EMPTY_USERNAME,
    }),
    role: Joi.string().trim().required().messages({
        "any.required": ROLE_REQUIRED,
        "string.empty": EMPTY_ROLE,
    }),
    password: Joi.string().trim().min(8).required().messages({
        "any.required": PASSWORD_REQUIRED,
        "string.empty": EMPTY_PASSWORD,
        "string.min": VALID_PASSWORD,
    }),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": MATCHING_PASSWORD,
        "any.required": CONFIRM_PASSWORD_REQUIRED, 
        "string.empty": EMPTY_CONFIRM_PASSWORD,
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required().lowercase().messages({
        "any.required": EMAIL_REQUIRED,
        "string.empty": EMPTY_EMAIL,
        "string.email": VALID_EMAIL,
    }),
    password: Joi.string().trim().required().messages({
        "any.required": PASSWORD_REQUIRED,
        "string.empty": EMPTY_PASSWORD,
    }),
});
