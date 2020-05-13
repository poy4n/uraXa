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
            err ? reject(err) : resolve(data.toString('base64'))
        })
    );
};

module.exports = {
    hashPassword,
    checkPassword,
    createToken
}