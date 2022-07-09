import jwt from 'jsonwebtoken';
import { orderSchema } from '../utils/schemas.js';
import STATUS from '../utils/statusCodes.js';

async function orderValidationMiddleware(req, res, next) {
  const order = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.sendStatus(STATUS.UNPROCESSABLE_ENTITY);
    return;
  }

  try {
    await orderSchema.validateAsync(order);
  } catch (error) {
    res
      .status(STATUS.UNPROCESSABLE_ENTITY)
      .send('Por favor, preencha os campos corretamente!');
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    const { session } = jwt.verify(token, secretKey);

    req.locals = {
      order,
      session,
    };

    next();
  } catch (error) {
    res
      .status(STATUS.UNAUTHORIZED)
      .send('Você precisa estar conectado para finalizar a compra!');
  }
}

export default orderValidationMiddleware;
