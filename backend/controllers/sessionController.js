const express = require('express'); 
const router = express.Router();
const sessionUtils = require('../utils/sessionUtils');
const User = require('../models/user');
const _ = require('lodash');

const userService = require('../services/userService');

// routs
router.post('/signup', async (req, res) => {
    const user = req.body;

    try {
        const isFound = await userService.findUser(user.email);
                  
        if(isFound) {
            res.status(409).send({warning: "User with this email already exist. Please Login."});
        } else {
            const userRecord = await userService.signup(user);
                        
            res.status(201).json(userRecord);                 
        }
    } catch(err) {
        res.status(500).send({ error: err.message })
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
   
    // try {
    //     const userRecord = await userService.login(email, password);
    //     console.log(userRecord);

    //     if(!_.isEmpty(userRecord)) {
    //         res.status(200).json(userRecord);
    //     } else {
    //         res.status(404).send({ error: "Email/Password are not correct." })
    //     }
        
    // } catch(err) {
    //     res.status(500).send({ error: err.message })
    // }
       

    let user

    User.findByEmail(email)
        .then(userRecord => {
            if(userRecord.rows.length > 0) {
                console.log(userRecord);
                
                user = userRecord.rows[0];                 
                return sessionUtils.checkPassword(password, user.password_digest);
            } else {
                res.status(404).send({error: "User with this email does not exist."})
            }
        })
        .then(res => {
            if(res) {
                return sessionUtils.createToken();
            } else {
                res.status(404).send({error: "Password is not correct."})   
            }
        })
        .then(token => User.updateUserToken(user.email, token))
        .then(updatedUserRecord => {
            delete user.password_digest;
            return res.status(200).json({ user: updatedUserRecord.rows[0] });
        })
        .catch(err => res.status(500).send({ error: err.message }));
});



module.exports = router;