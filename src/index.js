import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/router.js';
import deleteGhostSessions from './utils/session/deleteGhostSessions.js';

dotenv.config();

const server = express();
server.use([cors(), json()]);

server.use(router);

deleteGhostSessions();

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
