const jwt = require('jsonwebtoken');
const db = require('../../database/models');

const verifyJWT = async (token) => {
    try {
        const jwtSecret = process.env.JWT_SECRET_KEY;
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await db.userauth.findOne({
            where: {
                userName: decodedToken.userName,
            }
        });
        if (!user) {
            return "User does not exist";
        }
        return user.dataValues;
    }
    catch (error) {
        return "Invalid Token";
    }
}
module.exports = {
    verifyJWT,
}