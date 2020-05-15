// mini router
const express = require('express'); 
const _ = require('lodash');

const router = express.Router();
const User = require('../models/user');

const auth = require('../utils/authentication');

// find user by email
router.get('/user/email', (req, res) => {
        
    User
        .findByEmail(req.body.email)
        .then(userRecord => {
            if(userRecord.rows.length > 0) {
                return res.status(200).json({ user: userRecord.rows[0] })
            } else {
                return res.status(404).send({ error: "User with this email does not exist." })
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});

// find user by id
router.get('/user/id', (req, res) => {
        
    User
        .findById(req.body.id)
        .then(userRecord => {
            if(userRecord.rows.length > 0) {
                return res.status(200).json({ user: userRecord.rows[0] })
            } else {
                return res.status(404).send({ error: "User with this id does not exist." })
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});

// update user's avatar and description
router.patch('/user/email', (req, res) => {
    const { email, token, avatar, description } = req.body;
      
    auth
        .authenticate(email, token)
        .then(userRecord => {
            if (!_.isEmpty(userRecord)) {
                User
                    .updateUser(email, avatar, description)
                    .then(updatedUserRecord => res.status(200).json({ user: updatedUserRecord.rows[0] }))
                    .catch(err => res.status(500).send({ error: err.message }));
            } else {
                res.status(401).send({ error: "Unauthenticated user. Please login." })                       
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
});

module.exports = router;