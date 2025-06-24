import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import mainRouter from './routes';
import { AppDataSource } from './config/database';
import { specs } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', mainRouter);

AppDataSource.initialize()
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
        console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
      });
    }
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });

export default app; 