import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import { mongoDB } from "./config/mongoDB";
import routes from './routes/index';

mongoDB.connect();
const app = express();

app.use(express.json())
app.use(cors())
app.use(routes)

export default app;