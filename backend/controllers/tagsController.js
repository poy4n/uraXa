const express = require('express'); 

const router = express.Router();
const _ = require('lodash');

const auth = require('../utils/authentication');

const Tag = require('../models/tag');


// find post by tag id
router.get('/tag/', (req, res) => {
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
                            return res.status(404).send({ error: "The tags are not found." });
                        }
                    })
                    .catch(err => res.status(500).send({ error: err.message }));
            } else {
                return res.status(401).send({ error: "Unauthenticated user. Please login." });
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});


module.exports = router;