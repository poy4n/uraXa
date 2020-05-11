// mini router
const express = require('express'); 

const router = express.Router();
const User = require('../models/user');

const auth = require('../utils/authentication');

// find user by email
router.get('/user/email', (req, res) => {
        
    User
        .findByEmail(req.body.email)
        .then(query_res => {
            if(query_res) {
                res.status(200).json({user: query_res.rows[0]})
            } else {
                res.status(300).send({warning: "User with this email does not exist"})
            }
        })
        .catch(err =>                    
            res.status(500).send({error: err.message})                       
        );
});

// find user by id
router.get('/user/id', (req, res) => {
        
    User
        .findById(req.body.id)
        .then(query_res => {
            if(query_res) {
                res.status(200).json({user: query_res.rows[0]})
            } else {
                res.status(300).send({warning: "User with this id does not exist"})
            }
        })
        .catch(err =>                    
            res.status(500).send({error: err.message})                       
        );
});

// update user's avatar and description
router.patch('/user/email', (req, res) => {

    const param = req.body;
      
    auth
        .authenticate(param.email, param.token)
        .then(isLoggedIn => {
            if (isLoggedIn) {
                User
                    .updateUser(param.email, param.avatar, param.description)
                    .then(query_res => res.status(200).json({user: query_res.rows[0]}))
                    .catch(err =>                    
                        res.status(500).send({error: err.message})                       
                    );
            } else {
                res.status(300).send({warning: "User not logged in."})                       
            }
        });
});

module.exports = router;