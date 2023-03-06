const express = require('express');
const postsRouter = express.Router();
const {createPost} = require('../db');
const {getAllPosts} = require('../db');

const { requireUser } = require('./utils')

postsRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = ""} = req.body;
    const authorId = req.user.id
    const tagArr = tags.trim().split(/\s+/)
    const postData = {
        authorId,
        title,
        content
    };

    if (tagArr.length) {
        postData.tags = tagArr;
    }

    try{
        const post = await createPost (postData)
        if (post) {
        res.send( post )}
        
        else {
            next ({name: "Post creation error", message: "Error creating post"})
        }
    } catch ({ name, message}) {
        next({ name, message})
    }
});

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");

    next();
});

postsRouter.get('/', async (req, res) => {
    const posts = await getAllPosts();

    res.send({
        posts
    });
});

module.exports = postsRouter;