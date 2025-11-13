import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import  cors from 'cors'
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials:true}))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
