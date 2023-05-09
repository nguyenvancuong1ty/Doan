const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { create, deleted, update, getAll } = require('../model/DiemDanh');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetDiemDanh = async (req, res) => {
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

const apiCreateDiemDanh = async (req, res) => {
    const { id_student, id_course, status } = req.body;
    const isAdmin = Authorization(req);
    if (isAdmin) {
        const result = await create({ id_student, id_course, status });
        if (result) {
            return res.status(200).json({
                message: 'Create DiemDanh ok',
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

const apiDeleteDiemDanh = async (req, res) => {
    const { id } = req.body;
    const isAdmin = Authorization(req);
    if (isAdmin) {
        const result = await deleted({ id });
        if (result) {
            return res.status(200).json({
                message: 'Create DiemDanh ok',
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

const apiUpdateDiemDanh = async (req, res) => {
    const { username, password } = req.body;
    const { id } = req.params;
    const hash = bcrypt.hashSync(password, 8);
    const result = await update({ username, hash, id });
    if (result) {
        return res.status(200).json({
            message: 'Update DiemDanh ok',
        });
    } else {
        f;
        return res.status(401).json({
            message: 'invalid username or password',
        });
    }
};

module.exports = { apiCreateDiemDanh, apiDeleteDiemDanh, apiUpdateDiemDanh, apiGetDiemDanh };
