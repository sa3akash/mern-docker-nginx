import express from 'express';
import os from 'os';
import { loginUser, registerUser } from '../controllers/UserController.js';
import { createPost, getAllPost, getSinglePost } from '../controllers/PostContorller.js';

const router = express.Router();



router.post("/user/create", registerUser)
router.post("/user/login", loginUser)


//post
router.post("/post/create", createPost)
router.get("/posts", getAllPost)
router.get("/post/:id", getSinglePost)





export default router;