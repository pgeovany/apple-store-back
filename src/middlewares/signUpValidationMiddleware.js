import { getDataBase, closeDataBase } from '../databases/mongo.js';
import { signUpSchema } from '../utils/schemas.js';
import getUserByEmail from '../utils/user/getUserByEmail.js';
import STATUS from '../utils/statusCodes.js';

async function signUpValidationMiddleware(req, res, next) {
  const user = req.body;

  try {
    await signUpSchema.validateAsync(user);
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
    if (userExists) {
      res.status(STATUS.CONFLICT).send('Esse email já está cadastrado!');
      closeDataBase();
      return;
    }

    req.locals = {
      user,
      db,
    };

    next();
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send('Erro ao cadastrar usuário!');
    closeDataBase();
  }
}

export default signUpValidationMiddleware;
