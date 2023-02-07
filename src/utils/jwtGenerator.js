const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const generateJwtToken = (user) => {
    const jwtSecret = process.env.JWT_SECRET_KEY;
    const token=jwt.sign(user,jwtSecret,{expiresIn:'1h'});
    return token;
};
module.exports={
    generateJwtToken,
}