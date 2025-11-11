import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.tsx';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})

