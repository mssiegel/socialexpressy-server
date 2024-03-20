// src/index.ts
import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(express.json());
app.use(helmet());

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express! You rock!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
