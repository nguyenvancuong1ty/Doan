const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { create, deleted, update, getAll } = require('../model/DangKiNhuCau');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetDangKyNhuCau = async (req, res) => {
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

const apiCreateDangKyNhuCau = async (req, res) => {
    const { ngaydangky, taikhoandki, manhucau } = req.body;
    const isAdmin = Authorization(req);
    if (isAdmin) {
        const result = await create({ ngaydangky, taikhoandki, manhucau });
        if (result) {
            return res.status(200).json({
                message: 'Create DangKyNhuCau ok',
            });
        } else {
            return res.status(401).json({
                message: 'Error',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Forbidden',
        });
    }
};

const apiDeleteDangKyNhuCau = async (req, res) => {
    const { id } = req.body;
    const isAdmin = Authorization(req);
    if (isAdmin) {
        const result = await deleted({ id });
        if (result) {
            return res.status(200).json({
                message: 'Create DangKyNhuCau ok',
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

const apiUpdateDangKyNhuCau = async (req, res) => {
    const { username, password } = req.body;
    const { id } = req.params;
    const hash = bcrypt.hashSync(password, 8);
    const result = await update({ username, hash, id });
    if (result) {
        return res.status(200).json({
            message: 'Update DangKyNhuCau ok',
        });
    } else {
        f;
        return res.status(401).json({
            message: 'invalid username or password',
        });
    }
};

module.exports = { apiCreateDangKyNhuCau, apiDeleteDangKyNhuCau, apiUpdateDangKyNhuCau, apiGetDangKyNhuCau };
