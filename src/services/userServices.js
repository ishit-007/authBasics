const bcrypt = require('bcryptjs');
const db = require('../../database/models');
const jwtGenerator = require('../utils/jwtGenerator');
const jwtValidator = require('../utils/jwtValidator');


const createCredentialsService = async (userName, password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    const user = await db.userauth.create({
        userName: userName,
        password: encryptedPassword,
    });
    return user;
};
const loginService = async (userName, password) => {
    const user = await db.userauth.findOne({
        where: {
            userName: userName,
        },
    });
    if (!user) {
        return 'User does not exist';
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect) {
        const userData = {
            id: user.dataValues.id,
            userName: user.dataValues.userName,
            time: new Date(),
        }
        // console.log(userData);
        const token = jwtGenerator.generateJwtToken(userData);
        return token;
    } else {
        return 'Incorrect Password';
    }
};

const tokenValidationService = async (token) => {
    const tokenValidationResp = await jwtValidator.verifyJWT(token);
    return tokenValidationResp;
};
module.exports = {
    createCredentialsService,
    loginService,
    tokenValidationService,
};