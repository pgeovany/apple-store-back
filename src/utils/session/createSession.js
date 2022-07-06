async function createSession(session, userId, db) {
  await db.collection('sessions').insertOne({
    session,
    userId,
  });
}

export default createSession;
