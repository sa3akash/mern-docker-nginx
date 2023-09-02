import { ObjectId } from "mongodb";
import { postWithCache } from "../services/cache/Post.js";
import { postWithDB } from "../services/db/Post.js";

export const createPost = async (req, res) => {
  const { title, message } = req.body;

  try {
    const id = new ObjectId();

    await postWithCache.create(id, {
      title,
      message,
      creator: "shakil ahmed",
      likes: [],
      comments:[],
      createdAt: new Date().toUTCString(),
    });
     postWithDB.create(id, { title, message, creator: "shakil ahmed" });

    return res.status(200).json({ message: "Post created successfull." });
  } catch (err) {
    console.log(err);
  }
};

export const getSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const redisData = await postWithCache.getPostById(id);

      const data = redisData ? redisData : await postWithDB.getByPostId(id);

    res.status(200).json({ message: "Single post get successfull.", data });
  } catch (err) {
    console.log(err);
  }
};


export const getAllPost = async (req, res) => {
  const { page } = req.query;
  try {
    const pageNumber = Number(page) || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;

    const dataRedis = await postWithCache.getPostByPagination(skip, limit);
    const data = dataRedis.length
      ? dataRedis
      : await postWithDB.getAllPostWithPagination(skip, limit);

    const postCountRedis = await postWithCache.countOfPost();
    const postCount = postCountRedis
      ? postCountRedis
      : await postWithDB.countOfPosts();

    res
      .status(200)
      .json({
        message: "Get all post successfull.",
        data,
        currentPage: pageNumber,
        numberOfPages: Math.ceil(postCount / limit),
      });
  } catch (err) {
    console.log(err);
  }
};
