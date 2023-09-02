import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    message: {type: String},
    creator: {type: String, required: true},
    likes: [{type: String}],
    comments: [{type: String}],
}, { timestamps: true });

export const Post = mongoose.model("Post", PostSchema, "Post");
