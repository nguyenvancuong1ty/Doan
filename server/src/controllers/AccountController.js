const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { login, create, deleted, update, getAll } = require('../model/Account');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();
const AccountController = () => {};
const apiLogin = async (req, res) => {
    const { username, password } = req.body;
    const data = await login({ username });
    const checkPass = bcrypt.compareSync(password, data[0].password);
    if (checkPass) {
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

const apiGetAccount = async (req, res) => {
    const result = await getAll();
    if (result) {
        return res.status(200).json({
            statusCode: 200,
            data: result,
        });
    } else {
        return res.status(401).json({
            message: 'Error',
        });
    }
};

const apiCreateAccount = async (req, res) => {
    const { username, password } = req.body;
    const isAdmin = Authorization(req);
    const hash = bcrypt.hashSync(password, 8);
    if (isAdmin) {
        const result = await create({ username, hash });
        if (result) {
            return res.status(200).json({
                message: 'Create account ok',
            });
        } else {
            return res.status(401).json({
                message: 'invalid username or password',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Forbidden',
        });
    }
};

const apiDeleteAccount = async (req, res) => {
    const { id } = req.body;
    const isAdmin = Authorization(req);
    if (isAdmin) {
        const result = await deleted({ id });
        if (result) {
            return res.status(200).json({
                message: 'Create account ok',
            });
        } else {
            return res.status(401).json({
                message: 'invalid username or password',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Forbidden',
        });
    }
};

const apiUpdateAccount = async (req, res) => {
    const { username, password } = req.body;
    const { id } = req.params;
    const hash = bcrypt.hashSync(password, 8);
    const result = await update({ username, hash, id });
    if (result) {
        return res.status(200).json({
            message: 'Update account ok',
        });
    } else {
        f;
        return res.status(401).json({
            message: 'invalid username or password',
        });
    }
};

module.exports = { AccountController, apiLogin, apiCreateAccount, apiDeleteAccount, apiUpdateAccount, apiGetAccount };
