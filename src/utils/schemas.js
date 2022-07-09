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
    cardType: joi.string().required(),
    cardNumber: joi.string().required(),
    cvv: joi.number().min(100).max(999), // eslint-disable-line
  },
  items: joi.array().required(),
});

export { signUpSchema, signInSchema, orderSchema };
