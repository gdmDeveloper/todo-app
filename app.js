import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import authRouter from './routes/auth.js';
import taskRouter from './routes/task.js';
import groupRouter from './routes/group.js';

const app = express();
const host = process.env.HOST;

app.use(express.json());

app.use('/auth/', authRouter);
app.use('/tasks', taskRouter);
app.use('/group', groupRouter);

// ! START MONGOOSE

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));
// ! START UP SERVER

app.listen(host, () => {
  console.log(`Server started at ${host}`);
});
