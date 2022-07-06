import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function getDataBase() {
  await mongoClient.connect();
  return mongoClient.db('test');
}

async function closeDataBase() {
  await mongoClient.close();
}

export default { getDataBase, closeDataBase };
