const db = require("../db/db.js");

// select all posts
function allPosts() {
    return db.query("select * from posts;");
}

// find one post by id
function findById(id) {
    return db.query("SELECT posts.id, title, text, location, user_id, image, date, tag_id, tag, username FROM posts INNER JOIN tags ON (posts.tag_id=tags.id) INNER JOIN users ON (posts.user_id=users.id) WHERE posts.id = $1;", [id]);
}

// find posts by user_id
function findByUserId(user_id) {
    return db.query("SELECT posts.id, title, text, location, user_id, image, date, tag_id, tag, username FROM posts INNER JOIN tags ON (posts.tag_id=tags.id) INNER JOIN users ON (posts.user_id=users.id) WHERE user_id = $1;", [user_id]);
}

// find posts by tag_id
function findByTag(tag_id) {
    return db.query("SELECT posts.id, title, text, location, user_id, image, date, tag_id, tag, username FROM posts INNER JOIN tags ON (posts.tag_id=tags.id) INNER JOIN users ON (posts.user_id=users.id) WHERE tag_id = $1;", [tag_id]);
}

// find posts by tag_id
function allPostsWithTagsAndUserNames() {
    return db.query("SELECT posts.id, title, text, location, user_id, image, date, tag_id, tag, username FROM posts INNER JOIN tags ON (posts.tag_id=tags.id) INNER JOIN users ON (posts.user_id=users.id);");
}

// insert / create post
function createPost(title, text, location, user_id, image, tag_id) {     
    return db.query("WITH inserted AS (INSERT INTO posts (title, text, location, user_id, image, tag_id) VALUES ($1, $2, $3, $4, $5, $6) returning * ) SELECT inserted.*, users.username, tags.tag FROM inserted INNER JOIN tags ON inserted.tag_id=tags.id INNER JOIN users ON inserted.user_id=users.id;", [title, text, location, user_id, image, tag_id]);
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
    allPostsWithTagsAndUserNames,
    createPost,
    deletePost,
    deletePostsByUserId
};
