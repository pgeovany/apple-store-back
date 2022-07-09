async function deleteSession(session, db) {
  await db.collection('sessions').deleteOne({ session });
}

export default deleteSession;
