const Tag = require('../models/tag');

const tags = ["Local Knowledge", "History", "Beautiful", "Wildlife", "Thought Provoking", "Scenery", "People Watching", "Architecture", "Humour", "Poetic"];

tags.forEach(tag => {
    Tag.createTag(tag);
});

