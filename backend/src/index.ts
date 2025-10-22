import 'dotenv/config'; // <-- Questo carica subito

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cardsRouter from './routes/cards';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'lcsCards API is running!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});