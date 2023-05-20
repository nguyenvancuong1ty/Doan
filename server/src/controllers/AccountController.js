const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const  Account  = require('../model/Account');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetAccountByName = async (req, res) => {
    const search = req.query;
    try {
        const result = await Account.getByName({ search });
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                data: result,
            });
        } else {
            return res.status(404).json({
                message: 'Data not found',
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiLogin = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const data = await Account.login({ username, email });
        const checkPass = data.length > 0 && password && bcrypt.compareSync(password, data[0].password);
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
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiGetAccount = async (req, res) => {
    try {
        const result = await Account.getAll();
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                data: result,
            });
        } else {
            return res.status(404).json({
                message: 'Data not found',
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiCreateAccount = async (req, res) => {
    try {
        const { username, password } = req.body;
        const isAdmin = Authorization(req);
        const hash = bcrypt.hashSync(password, 8);
        if (isAdmin) {
            const result = await Account.create({ username, hash });
            if (result) {
                if (result.exists) {
                    return res.status(409).json({
                        message: 'Account exists',
                    });
                }
                return res.status(200).json({
                    message: 'Create account ok',
                });
            } else {
                return res.status(404).json({
                    message: 'data not found',
                });
            }
        } else {
            return res.status(403).json({
                message: 'Forbidden',
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiDeleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await Account.deleted({ id });
            if (result) {
                return res.status(200).json({
                    message: 'Delete account ok',
                });
            } else {
                return res.status(404).json({
                    message: 'data not found',
                });
            }
        } else {
            return res.status(403).json({
                message: 'Forbidden',
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiUpdateAccount = async (req, res) => {
    try {
        const { username, password, avatar } = req.body;
        const { id } = req.params;
        const hash = bcrypt.hashSync(password, 8);
        const result = await Account.update({ username, hash, avatar, id });
        console.log(result);
        if (result) {
            return res.status(200).json({
                message: 'Update account ok',
            });
        } else {
            return res.status(404).json({
                message: 'Data not found',
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiAccountPagination = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const result = await Account.pagination({ limit, page });
        if (result) {
            return res.status(200).json({
                data: result,
            });
        } else {
            return res.status(404).json({
                message: 'Resource not found',
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiDeleteAccountDeep = async (req, res) => {
    try {
        const { id } = req.params;
        const isSpAccount = isSupperAccount(req);
        if (isSpAccount) {
            const result = await Account.deleteDeep({ id });
            if (result) {
                return res.status(200).json({
                    message: 'Delete account ok',
                });
            } else {
                return res.status(404).json({
                    message: 'data not found',
                });
            }
        } else {
            return res.status(403).json({
                message: 'Forbidden',
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

module.exports = {
    apiGetAccountByName,
    apiLogin,
    apiCreateAccount,
    apiDeleteAccount,
    apiUpdateAccount,
    apiGetAccount,
    apiAccountPagination,
    apiDeleteAccountDeep,
};
