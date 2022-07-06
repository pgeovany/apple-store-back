import { v4 as uuid } from 'uuid';

import { closeDataBase } from '../databases/mongo.js';
import createAccount from '../utils/user/createAccount.js';
import createSession from '../utils/session/createSession.js';
import generateToken from '../utils/token/generateToken.js';
import STATUS from '../utils/statusCodes.js';

async function signIn(req, res) {
  const { user, db } = req.locals;

  try {
    const session = uuid();

    await createSession(session, user._id, db);

    const token = generateToken(session);

    res.send({ token });
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  } finally {
    closeDataBase();
  }
}

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

export { signUp, signIn };
