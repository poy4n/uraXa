const db = require("../db/db.js");

// select all users
function allPosts() {
    return db.query("select * from posts;");
}

// find one post by id
function findById(id) {
    return db.query("select * from posts where id = $1;", [id]);
}

// find posts by user_id
function findByUserId(user_id) {
    return db.query("select * from posts where user_id = $1;", [user_id]);
}

// find posts by tag_id
function findByTag(tag_id) {
    return db.query("select * from posts where tag_id = $1;", [tag_id]);
}

// insert / create post
function createPost(title, text, location, user_id, image, tag_id) {
    console.log(image);    
    return db.query("insert into posts (title, text, location, user_id, image, tag_id) values ($1, $2, $3, $4, $5, $6) returning *;", [title, text, location, user_id, image, tag_id]);
}

// delete post by id
function deletePost(id) {
    return db.query("delete from posts where id = $1 returning *;", [id]);
}

// delete all posts of user by user_id
function deletePostsByUserId(user_id) {
    return db.query("delete from posts where user_id = $1 returning *;", [user_id]);
}

module.exports = {
    allPosts,
    findById,
    findByUserId,
    findByTag,
    createPost,
    deletePost,
    deletePostsByUserId
};
