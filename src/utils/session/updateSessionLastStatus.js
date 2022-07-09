async function updateSessionLastStatus(session, lastStatus, db) {
  await db
    .collection('sessions')
    .updateOne({ session }, { $set: { lastStatus } });
}

export default updateSessionLastStatus;
