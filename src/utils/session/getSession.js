async function getSession(session, db) {
  return db.collection('sessions').findOne({ session });
}

export default getSession;
