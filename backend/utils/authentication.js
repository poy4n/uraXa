const User = require('../models/user');

const authenticate = async (email, token) => {
    console.log(email);
    console.log(token);
    
    
    const userRecord = await User.findByToken(token);
    
    return (userRecord.rows.length > 0 && userRecord.rows[0].email === email) ? 
        userRecord.rows[0] : 
        {};       
}

module.exports = {
    authenticate
}