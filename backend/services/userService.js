const sessionUtils = require('../utils/sessionUtils');
const User = require('../models/user');
const _ = require('lodash');

const signup = async user => {
    const hashedPassword = await sessionUtils.hashPassword(user.password);
    
    delete user.password;
    
    const token = await sessionUtils.createToken();

    const userRecord = await User.createUser(user.email, hashedPassword, user.username, user.description, token);    
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
        const isPasswordCorrect = await sessionUtils.checkPassword(password, foundUserRecord.rows[0].password_digest); 
                
        delete foundUserRecord[0].password_digest; 
        
        if(isPasswordCorrect) {
            const token = await sessionUtils.createToken();
                        
            const userRecord = await User.updateUserToken(email, token);
            console.log(userRecord);
            
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


// User.findByEmail(email)
//         .then(query_res => {
//             if(query_res) {
//                 user = query_res.rows[0];                 
//                 return sessionUtils.checkPassword(password, user.password_digest);
//             } else {
//                 res.status(404).send({error: "User with this email does not exist."})
//             }
//         })
//         .then(res => {
//             if(res) {
//                 return sessionUtils.createToken();
//             } else {
//                 res.status(404).send({error: "Password is not correct."})   
//             }
//         })
//         .then(token => User.updateUserToken(user.email, token))
//         .then(query_res_update => {
//             delete user.password_digest;
//             res.status(200).json({user: query_res_update.rows[0]})
//         })
//         .catch(err =>                    
//             res.status(500).send({error: err.message})                       
//         );
// });