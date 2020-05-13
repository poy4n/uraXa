const db = require("../db/db.js");

// find one image by id
function findById(id) {
    return db.query("select * from post_images where id = $1;", [id]);
}

// find images by post_id
function findByPostId(post_id) {
    return db.query("select * from post_images where post_id = $1;", [post_id]);
}

// insert / create post
function createPostImages(img_url, post_id) {
    return db.query("insert into post_images (img_url, post_id) values ($1, $2) returning *;", [img_url, post_id]);
}

// delete image by id
function deletePostImage(id) {
    return db.query("delete from post_images where id = $1 returning *;", [id]);
}

// delete all images of post by post_id
function deletePostImageByPostId(post_id) {
    return db.query("delete from post_images where post_id = $1 returning *;", [post_id]);
}

module.exports = {
    findById,
    findByPostId,
    createPostImages,
    deletePostImage,
    deletePostImageByPostId
};


