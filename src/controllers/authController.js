import { closeDataBase } from '../databases/mongo.js';
import createAccount from '../utils/user/createAccount.js';
import STATUS from '../utils/statusCodes.js';

async function signUp(req, res) {
  const { user, db } = req.locals;

  try {
    await createAccount(user, db);
    res.sendStatus(STATUS.CREATED);
    closeDataBase();
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send('Erro ao cadastrar usuário!');
    closeDataBase();
  }
}

export default signUp;
