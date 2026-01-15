import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
