import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URI } = process.env;
const mongoClient = new MongoClient(MONGO_URI);

async function getDataBase() {
  await mongoClient.connect();
  return mongoClient.db('test');
}

async function closeDataBase() {
  await mongoClient.close();
}

export { getDataBase, closeDataBase, ObjectId };
