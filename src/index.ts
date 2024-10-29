import express from 'express';
import debrisRouter from './routes/debris';
import connectDB from './db';

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/debris', debrisRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app