import { closeDataBase } from '../databases/mongo.js';
import STATUS from '../utils/statusCodes.js';
import updateSessionLastStatus from '../utils/session/updateSessionLastStatus.js';

async function updateStatus(req, res) {
  const { session, db } = req.locals;

  try {
    await updateSessionLastStatus(session, Date.now(), db);
    res.sendStatus(STATUS.OK);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  } finally {
    closeDataBase();
  }
}

export default updateStatus;
