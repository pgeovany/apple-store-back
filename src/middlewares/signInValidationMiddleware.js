import bcrypt from 'bcrypt';

import { getDataBase, closeDataBase } from '../databases/mongo.js';
import { signInSchema } from '../utils/schemas.js';
import getUserByEmail from '../utils/user/getUserByEmail.js';
import STATUS from '../utils/statusCodes.js';

async function signInValidationMiddleware(req, res, next) {
  const user = req.body;

  try {
    await signInSchema.validateAsync(user);
  } catch (error) {
    res
      .status(STATUS.UNPROCESSABLE_ENTITY)
      .send('Por favor, preencha os dados corretamente!');
    closeDataBase();
    return;
  }

  try {
    const db = await getDataBase();
    const userExists = await getUserByEmail(user.email, db);

    if (
      !userExists ||
      !bcrypt.compareSync(user.password, userExists.password)
    ) {
      res.status(STATUS.UNAUTHORIZED).send('E-mail ou senha incorretos!');
      closeDataBase();
      return;
    }

    req.locals = {
      userId: userExists._id,
      userName: userExists.name,
      db,
    };

    next();
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send('Erro ao logar usuário!');
    closeDataBase();
  }
}

export default signInValidationMiddleware;
