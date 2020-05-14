const express = require('express'); 

const router = express.Router();
const _ = require('lodash');

const auth = require('../utils/authentication');

const Post = require('../models/post');
const PostImage = require('../models/post_image');
const postImgs = require("../services/postImgsService");

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "photos",
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });


// find post by post id
router.get('/post/id', (req, res) => {
    const { email, token, id } = req.body;

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {
                Post
                    .findById(id)
                    .then(postRecord => {
                        if(postRecord.rows.length > 0) {
                            const post = postRecord.rows[0];

                            PostImage.findByPostId(post.id)
                                .then(postImagesRecord => {
                                    res.json({ post: post, images: postImagesRecord.rows });
                                })
                                .catch(err =>                    
                                    res.status(500).send({ error: err.message })                       
                                );
                        } else {
                            res.status(404).send({ error: "The post is not found." });
                        }
                    })
                    .catch(err =>                    
                        res.status(500).send({ error: err.message })                       
                    );
            } else {
                res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err =>                    
            res.status(500).send({ error: err.message })                       
        );
});

// find posts by user email
router.get('/post/email', (req, res) => {
    const { email, token } = req.body;

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {  
                console.log(userRecord);
                  
                Post
                    .findByUserId(userRecord.id)
                        .then(postRecord => {
                            if(postRecord.rows.length > 0) {
                                const posts = postRecord.rows;

                                Promise.all(posts.map(post => 
                                    postImgs.postImages(post)
                                        .then(imgRecords => {
                                            console.log(imgRecords);                                
                                            return ({ post: post, images: imgRecords });
                                        })
                                        .catch(err =>                    
                                            res.status(500).send({ error: err.message })                       
                                        )
                                ))
                                .then(postAndImages => 
                                    res.json({ posts: postAndImages }))
                                .catch(err =>                    
                                    res.status(500).send({ error: err.message })                       
                                );                            
                            } else {
                                res.status(404).send({ error: "There are no posts for this user." });
                            }
                        })
                        .catch(err =>                    
                            res.status(500).send({ error: err.message })                       
                        );
            } else {
                res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err =>                    
            res.status(500).send({ error: err.message })                       
        );
});

// create post
router.post('/post', parser.array("image"), (req, res) => {

    const { email, token, title, text, location } = req.body;
    const files = req.files;

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {                
                Post
                    .createPost(title, text, location, userRecord.id)
                    .then(postRecord => {
                        const post = postRecord.rows[0];

                        Promise.all(files.map(file => 
                            PostImage.createPostImages(file.url, post.id)
                                .then(imgRecords => {
                                    console.log(imgRecords);                                
                                    return ({ post: post, images: imgRecords.rows });
                                })
                                .catch(err =>                    
                                    res.status(500).send({ error: err.message })                       
                                )                        
                        ))
                        .then(postAndImages => 
                            res.status(201).json({ posts: postAndImages }))                            
                        .catch(err =>                    
                            res.status(500).send({ error: err.message })                       
                        );
                    })                         
                    .catch(err =>                    
                        res.status(500).send({ error: err.message })                       
                    );
            } else {
                res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err =>                    
            res.status(500).send({ error: err.message })                       
        );
});

// delete post by post id
router.delete('/post/id', (req, res) => {
    const { email, token, id } = req.body;

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {
                Post
                    .deletePost(id)
                    .then(deletedPostRecord => {
                        console.log(deletedPostRecord);
                        
                        res.json({ post: deletedPostRecord.rows[0] })
                    })
                    .catch(err =>                    
                        res.status(500).send({ error: err.message })                       
                    );
            } else {
                res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err =>                    
            res.status(500).send({ error: err.message })                       
        );
});

// delete posts of a user by user email
router.delete('/post/email', (req, res) => {
    const { email, token } = req.body;

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {
                Post
                    .deletePostsByUserId(userRecord.id)
                    .then(deletedPostsRecords => 
                        res.json({ post: deletedPostsRecords.rows }))
                    .catch(err =>                    
                        res.status(500).send({ error: err.message })                       
                    );
            } else {
                res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err =>                    
            res.status(500).send({ error: err.message })                       
        );
});


module.exports = router;
