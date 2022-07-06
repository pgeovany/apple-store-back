async function getUserByEmail(email, db) {
  return db.collection('users').findOne({ email });
}

export default getUserByEmail;
