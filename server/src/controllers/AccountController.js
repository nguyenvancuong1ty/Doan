var jwt = require('jsonwebtoken');
const { login } = require('../model/Account');
require('dotenv').config();
const AccountController = () => {};
const apiLogin = async (req, res) => {
    const { username, password } = req.body;
    const result = await login({ res, username, password });
    if (result.length > 0) {
        return res.status(200).json({
            token: jwt.sign(
                {
                    data: { username, password },
                },
                process.env.SECRET,
                { expiresIn: 60 * 60 },
            ),
        });
    } else {
        return res.status(401).json({
            message: 'invalid username or password',
        });
    }
};
module.exports = { AccountController, apiLogin };
