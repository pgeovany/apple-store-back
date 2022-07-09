import jwt from 'jsonwebtoken';
import { getDataBase, closeDataBase } from '../databases/mongo.js';
import getSession from '../utils/session/getSession.js';
import STATUS from '../utils/statusCodes.js';

async function tokenValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.sendStatus(STATUS.UNAUTHORIZED);
    return;
  }

  let session;

  try {
    const jwtSecret = process.env.JWT_SECRET;

    const decoded = jwt.verify(token, jwtSecret);
    session = decoded.session;
  } catch (error) {
    res.sendStatus(STATUS.UNAUTHORIZED);
  }

  try {
    const db = await getDataBase();
    const sessionExists = await getSession(session, db);

    if (!sessionExists) {
      res.sendStatus(STATUS.UNAUTHORIZED);
      return;
    }

    req.locals = {
      session,
      db,
    };

    next();
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
    closeDataBase();
  }
}

export default tokenValidationMiddleware;
