import Joi from "joi";

export const createCartSchema = Joi.object({
    productId: Joi.string().trim().required().messages({
        "any.required": 'PRODUCT ID REQUIRED',
        "string.empty": 'PRODUCT ID CANNOT BE EMPTY',
    }),
    quantity: Joi.number().required().messages({
        "any.required": 'QUANTITY_REQUIRED',
        "number.empty": 'EMPTY_QUANTITY',
    }),
});
