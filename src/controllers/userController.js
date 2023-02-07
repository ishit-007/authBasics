const userServices = require('../services/userServices');

const createCredentialsHandler = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const createUserResp = await userServices.createCredentialsService(userName, password);
    console.log(createUserResp);
    res.send(createUserResp);
};
const loginHandler = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const loginResp = await userServices.loginService(userName, password);
    console.log(loginResp);
    res.send(loginResp);
};

const tokenValidationHandler = async (req, res) => {
    const token = req.body.token;
    const tokenValidationResp = await userServices.tokenValidationService(token);
    console.log(tokenValidationResp);
    res.send(tokenValidationResp);
};
module.exports = {
    createCredentialsHandler,
    loginHandler,
    tokenValidationHandler,
};