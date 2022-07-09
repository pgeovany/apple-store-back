import joi from 'joi';

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const orderSchema = joi.object({
  adress: joi.string().required(),
  paymentInfo: {
    name: joi.string().required(),
    cardType: joi.string().valid('credit', 'debit').required(),
    cardNumber: joi.string().required(),
    cvv: joi.string().pattern(/^[0-9]{3}$/),
  },
  items: joi.array().required(),
});

export { signUpSchema, signInSchema, orderSchema };
