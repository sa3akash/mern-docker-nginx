import { createClient } from "redis";
import mongoose from "mongoose";

const url_mongodb = "mongodb://db:27017/testDB";


const url_redis = "redis://redis-stack:6379";
const client = createClient({ url: url_redis });


const connectWithRedis = async () => {
  try {
    await client.connect();
    console.log("##########################################################");
    console.log("#####             REDIS STORE CONNECTED              #####");
    console.log("##########################################################\n");
  } catch (err) {
    console.log(`Redis error: ${err.message}`);
  }
};

const connectWithDB = async () => {
  try {
    await mongoose.connect(url_mongodb);
    console.log("##########################################################");
    console.log("##########           MONGO-DB CONNECTED         ##########");
    console.log("##########################################################\n");
  } catch (err) {
    console.log(`Mongo error: ${err.message}`);
  }
};

connectWithRedis();
connectWithDB();


export default client;