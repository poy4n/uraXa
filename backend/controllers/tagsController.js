const express = require('express'); 

const router = express.Router();
const _ = require('lodash');

const auth = require('../services/authService');

const Tag = require('../models/tag');


// get all tags
router.get('/tag', (req, res) => {
    const { email, token } = req.query;
    console.log(email);

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {
                Tag
                    .allTags()
                    .then(tagsRecord => {
                        if(tagsRecord.rows.length > 0) {                            
                            return res.status(200).json({ tags: tagsRecord.rows });
                        } else {
                            return res.status(404).send({ error: "There are no tags." });
                        }
                    })
                    .catch(err => res.status(500).send({ error: err.message }));
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});

// create tag
router.post('/tag', (req, res) => {
    const { email, token, tag } = req.body;
    
    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {                
                Tag
                    .createTag(tag)
                    .then(tagRecord => res.status(201).json({ tag: tagRecord.rows[0] }))                                          
                    .catch(err => res.status(500).send({ error: err.message }));
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});

// delete tag by tag id
router.delete('/tag/id', (req, res) => {
    const { email, token, id } = req.body;

    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {
                Tag
                    .deleteTag(id)
                    .then(deletedTagRecord => res.status(200).json({ tag: deletedTagRecord.rows[0] }))
                    .catch(err => res.status(500).send({ error: err.message }));
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});


module.exports = router;