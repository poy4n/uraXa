// const sessionUtils = require('../utils/sessionUtils');
const User = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Utility methods
const hashPassword = password => {
    return new Promise((resolve, reject) => 
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    );
};

const checkPassword = (reqPassword, password_digest) => {
    console.log(reqPassword);
    console.log(password_digest);
        
    return new Promise((resolve, reject) => {
        bcrypt.compare(reqPassword, password_digest, (err, res) => {
            if(err) {
                reject(err);
            } else if (res) {
                resolve(res);
            } else {
                reject(new Error('Password do not match.'))
            }
        });
    });
};

const createToken = () => {
    return new Promise((resolve, reject) => 
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('hex'))
        })
    );
};


// services
const signup = async user => {
    const hashedPassword = await hashPassword(user.password);    
    delete user.password;
    
    const token = await createToken();

    const userRecord = await User.createUser(user.email, hashedPassword, user.username, user.description, token, user.position);    
    delete userRecord.rows[0].password_digest;
  
    return ({ user: userRecord.rows[0] });  
}

const findUser = async email => {
    const foundUserRecord = await User.findByEmail(email);
       
    return foundUserRecord.rows.length > 0;
}

const login = async (email, password) => {
    const foundUserRecord = await User.findByEmail(email);
    let logedInUser = {};

    if(foundUserRecord.rows.length > 0) {
        const isPasswordCorrect = await checkPassword(password, foundUserRecord.rows[0].password_digest); 
        delete foundUserRecord.rows[0].password_digest; 
        
        if(isPasswordCorrect) {
            const token = await createToken();
                                    
            const userRecord = await User.updateUserToken(email, token);
            delete userRecord.rows[0].password_digest;
            
            logedInUser = userRecord.rows[0]; 
        }               
    }

    return ({user: logedInUser});
}

module.exports = {
    signup,
    findUser,
    login
}