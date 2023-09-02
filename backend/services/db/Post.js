import { Post } from "../../model/db/Post.js";

class PostWithDb {
  async create(id, data) {
    try{
      const dataSave = new Post({
        _id: id,
        ...data,
      });
      await dataSave.save();
    }catch(err){
      console.log(err)
    }
  }

  async getAllPostWithPagination(skip, limit) {
    try{
      return await Post.aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]);
    }catch(err){
      console.log(err);
    }
  }

  async countOfPosts() {
    return await Post.countDocuments();
  }
  async getByPostId(id) {
    return await Post.findById(id);
  }
}

export const postWithDB = new PostWithDb();
