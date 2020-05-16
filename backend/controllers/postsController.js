const express = require('express');

const router = express.Router();
const _ = require('lodash');

const auth = require('../services/authService');

const Post = require('../models/post');
const Tag = require('../models/tag');

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
	folder: 'photos',
	allowedFormats: [ 'jpg', 'png' ],
	transformation: [ { width: 500, height: 500, crop: 'limit' } ]
});

const parser = multer({ storage: storage });

// find post by post id
router.get('/post/id', (req, res) => {
    const { email, token, id } = req.query;
    console.log(email, token);

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {

                Post
                    .findById(id)
                    .then(postsRecord => {
                        if(postsRecord.rows.length > 0) {
                            return res.status(200).json({ posts: postsRecord.rows });
                        } else {
                            return res.status(404).send({ error: "There are no posts for this user." });
                        }
                    })
                    .catch(err => res.status(500).send({ error: err.message }));
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});

// find posts by user email
router.get('/post/email', (req, res) => {
	const { email, token } = req.query;

	auth
		.authenticate(email, token)
		.then((userRecord) => {
			if (!_.isEmpty(userRecord)) {
				console.log(userRecord);

				Post.findByUserId(userRecord.id)
					.then((postsRecord) => {
						if (postsRecord.rows.length > 0) {
							return res.status(200).json({ posts: postsRecord.rows });
						} else {
							return res.status(404).send({ error: 'There are no posts for this user.' });
						}
					})
					.catch((err) => res.status(500).send({ error: err.message }));
			} else {
				return res.status(401).send({ error: 'Unauthenticated user. Please login.' });
			}
		})
		.catch((err) => res.status(500).send({ error: err.message }));
});

// find posts by tag
router.get('/post/tag', (req, res) => {
    const { email, token, tag } = req.query;

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {  
                console.log(userRecord);
                  
                Post
                    .findByTag(tag)
                    .then(postsRecord => {
                        if(postsRecord.rows.length > 0) {
                            return res.status(200).json({ posts: postsRecord.rows })
                        } else {
                            return res.status(404).send({ error: "There are no posts for this tag." });
                        }
                    })
                    .catch(err => res.status(500).send({ error: err.message }));
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});

const postsByTags = tags => {
    return Promise.all(                                                       
        tags.map(tag =>
            Post
                .findByTag(tag.id)
                .then(postsRecord => {
                    if(postsRecord.rows.length > 0) {                                            
                        return { tag: tag.tag, posts: postsRecord.rows };                                    
                    } else {
                        return { tag: tag.tag, posts: []}
                    } 
                })
                .catch(err => res.status(500).send({ error: err.message }))
        ))   
        .then(postsByTag => {
            return postsByTag
        })
        .catch((err) => res.status(500).send({ error: err.message })) 
}

// get posts by all tags
router.get('/post/tags/all', (req, res) => {
    const { email, token } = req.query;

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {  
                console.log(userRecord);
                
                Tag
                    .allTags()
                    .then(tagsRecord => tagsRecord.rows)                        
                    .then(tags => {
                        postsByTags(tags)
                        .then(postsByTag => res.status(200).json({ postsByTag: postsByTag }))
                        .catch((err) => res.status(500).send({ error: err.message }));
                    })
                    .catch((err) => res.status(500).send({ error: err.message }))
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});

const getTagsRecords = ids => {
    return Promise.all(
        ids.map(tagId => 
            Tag
                .findById(tagId)
                .then(tagsRecord => {
                    console.log(tagsRecord.rows[0]);                    
                    return tagsRecord.rows[0];
                })                        
                .catch((err) => res.status(500).send({ error: err.message }))
    ))
    .then(tags => {
        console.log(tags);        
        return tags;
    })
    .catch((err) => res.status(500).send({ error: err.message }))
}

// find posts by tag ids
router.get('/post/tag/ids', (req, res) => {
    const { email, token, ids } = req.query;
    console.log(req.query);
    // var ids = JSON.parse(req.query['ids']); //use if impl will use QueryString
    

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {  
                console.log(userRecord);
                
                getTagsRecords(ids)
                    .then(tags => {
                        postsByTags(tags)
                        .then(postsByTag => res.status(200).json({ postsByTag: postsByTag }))
                        .catch((err) => res.status(500).send({ error: err.message }));
                    })
                    .catch((err) => res.status(500).send({ error: err.message }))
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});

// create post
router.post('/post', parser.single("image"), (req, res) => {

    const { email, token, title, text, location, tag } = req.body;
    const image = req.file;

    const imageUrl = image ? image.url : "";

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {                
                Post
                    .createPost(title, text, location, userRecord.id, imageUrl, tag)
                    .then(postRecord => {
                        const post = postRecord.rows[0];
                        console.log(post);
                        
                        return res.status(201).json({ post: post });                        
                    })                                          
                    .catch(err => res.status(500).send({ error: err.message }));
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));

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
                    .then(deletedPostRecord => res.status(200).json({ post: deletedPostRecord.rows[0] }))
                    .catch(err => res.status(500).send({ error: err.message }));
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));

});

// delete posts of a user by user email
router.delete('/post/email', (req, res) => {
	const { email, token } = req.body;

	auth
		.authenticate(email, token)
		.then((userRecord) => {
			if (!_.isEmpty(userRecord)) {
				Post.deletePostsByUserId(userRecord.id)
					.then((deletedPostsRecords) => res.status(200).json({ post: deletedPostsRecords.rows }))
					.catch((err) => res.status(500).send({ error: err.message }));
			} else {
				return res.status(401).send({ error: 'Unauthenticated user. Please login.' });
			}
		})
		.catch((err) => res.status(500).send({ error: err.message }));
});

module.exports = router;
