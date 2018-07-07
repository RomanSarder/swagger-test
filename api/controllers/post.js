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
    let {username, text} = req.body;
    let isUsernameValid = /^[0-9a-zA-Z]+$/.test(username);
    let isTextValid = text.length < 200 && text.length > 0;
    if (isUsernameValid && isTextValid) {
        const newPost = new Post({ username: username, text: text })
        newPost.save(function (err) {
        if (err) {
            res.status(500).json({message: err.message});
        }
            res.json({ success: 1, description: 'post created' })
        })
    } else {
        res.status(500).json({message: 'Username must contain only letters and digits. Text length must be less then 200'})
    }
}