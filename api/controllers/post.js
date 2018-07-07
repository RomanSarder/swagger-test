'use strict'

const Post = require('../schemas/Post');

module.exports = {getPostList, createPost}

function getPostList (req, res, next) {
    Post.find({}, function (err, posts) {
        if (err) {
            res.json({message: err.message}).status(500);
        }
        res.json({posts})
    })
}

function createPost (req, res, next) {
    const newPost = new Post({ username: req.body.username, text: req.body.text })
    newPost.save(function (err) {
        if (err) {
            res.json({message: err.message}).status(500);
        }
        res.json({ success: 1, description: 'post created' })
    })
}