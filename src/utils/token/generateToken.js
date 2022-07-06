import jwt from 'jsonwebtoken';

function generateToken(session) {
  const jwtExpiration = 60 * 60 * 24 * 7; /* eslint-disable-line */

  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign({ session }, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  return token;
}

export default generateToken;
