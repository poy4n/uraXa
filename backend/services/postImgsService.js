const Post = require('../controllers/postsController');
const PostImage = require('../models/post_image');

const postImages = async post => {
    const postImagesRecord = await PostImage.findByPostId(post.id);

    return ({ post: post, images: postImagesRecord.rows });
};

module.exports = {
    postImages
}