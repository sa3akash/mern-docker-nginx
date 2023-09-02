import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import './conf/dbConnection.js';
import router from './routes/index.js';
import os from 'os';

const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes

app.use('/api', router);

app.get('/',(req,res)=>{
    res.json({message:'Hello World', hostname: os.hostname()})
})
app.get('*',(req,res)=>{
    res.status(404).json({message:'Not Found!!', hostname: os.hostname()})
})



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("##########################################################");
    console.log(`########       STARTING SERVER ON PORT ${PORT}       ########`);
    console.log("##########################################################\n");
});