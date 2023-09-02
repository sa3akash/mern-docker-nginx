import { ObjectId } from "mongodb";
import { userRedisService } from "../services/cache/User.js";
import { userWithDB } from "../services/db/User.js";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const id = new ObjectId();

    const userRedis = await userRedisService.chackFildWithValue('email',email);
    const existUser = userRedis ? userRedis : await userWithDB.checkWithEmail(email);
    if(existUser){
        return res.status(400).json({message: 'User already exists'});
    }

    const hashPassword = await bcrypt.hash(password,10);

    userRedisService.redisRedister(id, { name, email, password:hashPassword,createdAt:new Date().toUTCString()});
    userWithDB.register(id, { name, email, password:hashPassword });
    

    res.status(201).json({message: 'User registered successfully'});
  } catch (err) {
    console.log(err);
  }
};



export const loginUser = async (req, res) => {
    const { email, password} = req.body;
    try{
        const userRedis = await userRedisService.chackFildWithValue('email',email);
        const existUser = userRedis ? userRedis : await userWithDB.checkWithEmail(email);

        if(!existUser){
            return res.status(400).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, existUser.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid password'});
        }

        const {password:rr, ...others} = existUser;

        res.status(200).json({message: 'User logged in successfully',user:others});

    }catch(err){
        console.log(err);
    }

};