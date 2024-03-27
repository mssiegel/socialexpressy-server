// src/index.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import corsOptions from './services/corsOptions.js';
import userRoutes from './user.routes.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

app.use('/api/v1/users', userRoutes);

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express! You rock!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
