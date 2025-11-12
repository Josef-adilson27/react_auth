import express from 'express';
import mongoose from 'mongoose';

    const username = 'admin';
    const password = 'password123';
    const database = 'mydb';
    const host = 'mongodb';
  
mongoose.connect(`${host}://${username}:${password}@${host}:27017/${database}?authSource=${username}`, {
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false,
})

.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


app.get('/', async (req, res)=>{

})



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
