// src/index.ts
import express from 'express';
import helmet from 'helmet';

import sequelize from './db.js';
import userRoutes from './user.routes.js';

try {
  await sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app = express();
app.use(express.json());
app.use(helmet());

app.use('/api/v1/users', userRoutes);

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express! You rock!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
