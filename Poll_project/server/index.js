import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js'
import userRouter from './routes/user.routes.js';
import pollRouter from './routes/poll.routes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({message: 'Hello World!'});
}) 

app.use('/api/v1/users', userRouter);
app.use('/api/v1/polls', pollRouter);

const startServer = async() =>{
    try{
        //connect to database
        connectDB(process.env.MONGODB_URL);

        app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
    }catch(error){
        console.log(error);
    }
}

startServer();