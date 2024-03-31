// src/index.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';

import corsOptions from './services/corsOptions.js';
import userRoutes from './user.routes.js';
import { errorHandler } from './middlewares/errors.js';

const app = express();
app.use(express.json());
app.use(helmet());

// logging
const morganSetting =
  process.env.NODE_ENV === 'development' ? 'tiny' : 'combined';
app.use(morgan(morganSetting));

app.use(cors(corsOptions));

app.use('/api/v1/users', userRoutes);
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express! You rock!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
