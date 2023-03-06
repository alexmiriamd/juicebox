const express = require('express');
const tagsRouter = express.Router();

const {getAllTags, getPostsByTagName} = require('../db');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next();
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    });
});

tagsRouter.get('/:tagname/posts', async (req, res, next) => {       // get posts with tag (GET)
    const tagName  = req.params.tagname;
    try{
        const allPosts = await getPostsByTagName(tagName);

        const posts = allPosts.filter(post => {

            if(!post.active){
                return false
            }
            if(req.user && post.author.id !== req.user.id){
                return false
            }
            return true
        })

        res.send({ posts });

    } catch({ name, message }) {
        next({name, message});
    }
})

module.exports = tagsRouter;