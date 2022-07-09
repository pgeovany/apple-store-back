import registerOrder from '../utils/orders/registerOrder.js';
import STATUS from '../utils/statusCodes.js';

async function newOrder(req, res) {
  const { session, order } = req.locals;

  try {
    await registerOrder(session, order);
    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export default newOrder;
