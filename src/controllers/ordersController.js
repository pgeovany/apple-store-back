import jwt from 'jsonwebtoken';
import { getDataBase } from '../databases/mongo.js';
import STATUS from '../utils/statusCodes.js';

async function newOrder(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.sendStatus(STATUS.UNAUTHORIZED);
    return;
  }

  const secretKey = process.env.JWT_SECRET;
  try {
    const { session } = jwt.verify(token, secretKey);
    const db = await getDataBase();
    const data = await db.collection('sessions').findOne({ session });
    console.log(data);

    res.sendStatus(STATUS.OK);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export default newOrder;
