const User = require('../models/user');

const authenticate = async (email, token) => {
    const query_res = await User.findByToken(token);
    
    return query_res.rows.length > 0 ? query_res.rows[0].email === email : false;       
}

module.exports = {
    authenticate
}