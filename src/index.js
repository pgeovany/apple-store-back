import express, { application, json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use([cors(), json()]);

server.get('/hello', async (req, res) => {
  res.status(200).send('Hello');
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
