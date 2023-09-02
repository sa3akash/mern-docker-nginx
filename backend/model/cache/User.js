import { Repository, Schema } from "redis-om";
import client from "../../conf/dbConnection.js";

const userSchema = new Schema(
  "User",
  {
    name: { type: "string"},
    email: { type: "string"},
    password: { type: "string"},
    createdAt: { type: "date", sortable: true },
  },
  { dataStructure: "JSON", }
);

export const userRepository = new Repository(userSchema, client);
await userRepository.createIndex();
