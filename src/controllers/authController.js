import Joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

import httpStatus from '../utils/httpStatus.js';
import mongo from '../database/mongo.js';

async function signIn(req, res) {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const validation = schema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (validation.error) {
    res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
    return;
  }

  try {
    const db = await mongo.getDataBase();

    const user = await db.collection('users').findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.sendStatus(httpStatus.UNAUTHORIZED);
      return;
    }

    const session = uuid();
    const userId = user._id;

    await db.collection('sessions').insertOne({ session, userId });

    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign({ session }, jwtSecret, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    res.send({ token });
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default { signIn };
