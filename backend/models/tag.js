const db = require("../db/db.js");

// select all users
function allTags() {
    return db.query("select * from tags;");
}

// find one tag by id
function findById(id) {
    return db.query("select * from tags where id = $1;", [id]);
}

// insert / create tag
function createTag(tag) {
    return db.query("insert into tags (tag) values ($1) returning *;", [tag]);
}

// delete tag by id
function deleteTag(id) {
    return db.query("delete from tags where id = $1 returning *;", [id]);
}

module.exports = {
    allTags,
    findById,
    createTag,
    deleteTag    
};
