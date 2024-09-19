require('dotenv').config();

const jwt = require('jsonwebtoken');
const generateToken = (admin) => {
    return jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.SECRET_KEY, 
        { expiresIn: '1d' }
    );
};

module.exports = generateToken;
