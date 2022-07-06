import bcrypt from 'bcrypt';

async function createAccount(user, db) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(user.password, SALT);
  await db.collection('users').insertOne({
    name: user.name,
    email: user.email,
    password: passwordHash,
  });
}

export default createAccount;
