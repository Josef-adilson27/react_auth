import express from 'express';
import cookieParser from 'cookie-parser'
import  cors from 'cors'
import { authRouter } from './routes/authRoutes';
const app = express();
const port = process.env.PORT || 5000;
import { databaseInstance } from './config/mongoDB/mongoDB';

import dotenv from 'dotenv';


await databaseInstance.connect();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));
app.use('/api',authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
