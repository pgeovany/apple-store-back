async function createSession(session, userId, db) {
  await db.collection('sessions').insertOne({
    session,
    userId,
    createdAt: Date.now(),
  });
}

export default createSession;
