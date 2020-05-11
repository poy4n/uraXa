const express = require('express'); 
const router = express.Router();
const sessionUtils = require('../utils/sessionUtils');
const User = require('../models/user');


// routs
router.post('/signup', (req, res) => {

    const user = req.body;

    User
        .findByEmail(user.email)
        .then(query_find_res => {
            if(query_find_res.rows.length > 0) {
                return res.status(300).send({warning: "User with this email already exist. Please Login"});
            } else {
                sessionUtils.hashPassword(user.password)
                .then(hashedPassword => {
                    delete user.password;
                    user.password_digest = hashedPassword;
                    console.log(hashedPassword);
                    console.log(user.password_digest);
                })
                .then(() => sessionUtils.createToken())
                .then(token => user.token = token)
                .then(() => User.createUser(user.email, user.password_digest, user.avatar, user.description, user.username, user.token))
                .then(query_res_create => {
                    delete user.password_digest;
                    res.status(201).json({user: query_res_create.rows[0]})
                })
                .catch(err =>                    
                    res.status(500).send({error: err.message})                       
                );     
            }
        });
});


router.post('/login', (req, res) => {
    const userReq = req.body;
    let user

    User.findByEmail(userReq.email)
        .then(query_res => {
            if(query_res) {
                user = query_res.rows[0];                 
                return sessionUtils.checkPassword(userReq.password, user.password_digest);
            } else {
                res.status(300).send({warning: "User with this email does not exist"})
            }
        })
        .then(res => sessionUtils.createToken())
        .then(token => User.updateUserToken(user.email, token))
        .then(query_res_update => {
            delete user.password_digest;
            res.status(200).json({user: query_res_update.rows[0]})
        })
        .catch(err =>                    
            res.status(500).send({error: err.message})                       
        );
});



module.exports = router;