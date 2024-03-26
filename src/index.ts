// src/index.ts
import express from 'express';
import helmet from 'helmet';

import sequelize from './db.js';
import { updateStreak } from './user.controller.js';

try {
  await sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app = express();
app.use(express.json());
app.use(helmet());

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express! You rock!');
});

app.patch('/users/:userid/update-streak', (req, res) => {
  const userid = Number(req.params.userid);
  const date: Date = req.body.date;
  updateStreak(userid, date);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
