import bcrypt from 'bcrypt';
import { getDataBase, closeDataBase } from '../../databases/mongo.js';

async function registerOrder(session, order) {
  const db = await getDataBase();

  const { userId } = await db.collection('sessions').findOne({ session });

  const SALT = 10;
  const cardNumberHash = bcrypt.hashSync(order.paymentInfo.cardNumber, SALT);
  const cvvHash = bcrypt.hashSync(order.paymentInfo.cvv.toString(), SALT);

  await db.collection('orders').insertOne({
    userId,
    ...order,
    paymentInfo: {
      name: order.paymentInfo.name,
      cardType: order.paymentInfo.cardType,
      cardNumber: cardNumberHash,
      cvv: cvvHash,
    },
  });

  closeDataBase();
}

export default registerOrder;
