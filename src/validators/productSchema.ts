import Joi from "joi";
import {
    NAME_REQUIRED,
    DESCRIPTION_REQUIRED,
    PRICE_REQUIRED,
    CATEGORY_REQUIRED,
    QUANTITY_REQUIRED,
    EMPTY_NAME,
    EMPTY_DESCRIPTION,
    EMPTY_PRICE,
    EMPTY_CATEGORY,
    EMPTY_QUANTITY,
} from "../product/utils/constants";

export const createProductSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "any.required": NAME_REQUIRED,
        "string.empty": EMPTY_NAME,
    }),
    description: Joi.string().trim().required().messages({
        "any.required": DESCRIPTION_REQUIRED,
        "string.empty": EMPTY_DESCRIPTION,
    }),
    price: Joi.number().required().messages({
        "any.required": PRICE_REQUIRED,
        "number.empty": EMPTY_PRICE,
    }),
    category: Joi.string().trim().required().messages({
        "any.required": CATEGORY_REQUIRED,
        "string.empty": EMPTY_CATEGORY,
    }),
    quantity: Joi.number().required().messages({
        "any.required": QUANTITY_REQUIRED,
        "number.empty": EMPTY_QUANTITY,
    }),
});

export const updateProductSchema = Joi.object({
    name: Joi.string().trim(),
    description: Joi.string().trim(),
    price: Joi.number(),
    category: Joi.string().trim(),
    quantity: Joi.number(),
});
