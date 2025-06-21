import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routes';
import { AppDataSource } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', mainRouter);

AppDataSource.initialize()
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });

export default app; 