import { Schema,Repository } from "redis-om";
import client from "../../conf/dbConnection.js";

const postSchema = new Schema(
  'Post',
  {
    title: { type: "text"},
    message: { type: "text" },
    creator: { type: "string" },
    likes: { type: "string[]" },
    comments: { type: "string[]" },
    createdAt: { type: "date", sortable: true },
  },
  {
    dataStructure: "JSON",
  }
);

export const postRepository = new Repository(postSchema, client)

await postRepository.createIndex();