import { getDataBase } from '../../databases/mongo.js';

async function getAllProducts() {
  const db = await getDataBase();

  return db.collection('products').find().toArray();
}

export default getAllProducts;
