const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { create, deleted, update, getAll, getById, getByName } = require('../model/DangKiNhuCau');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetDangKyNhuCauByName = async (req, res) => {
    const search = req.query;
    try {
        const result = await getByName({ search });
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
const apiGetDangKyNhuCauById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getById({ id });
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
const apiGetDangKyNhuCau = async (req, res) => {
    try {
        const result = await getAll();
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                data: result,
            });
        } else {
            return res.status(404).json({
                message: 'data not found',
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiCreateDangKyNhuCau = async (req, res) => {
    try {
        const { madangky, taikhoandki, manhucau } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await create({ madangky, taikhoandki, manhucau });
            if (result) {
                return res.status(200).json({
                    message: 'Create DangKyNhuCau ok',
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

const apiDeleteDangKyNhuCau = async (req, res) => {
    try {
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await deleted({ id });
            if (result) {
                return res.status(200).json({
                    message: 'Delete DangKyNhuCau ok',
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
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiUpdateDangKyNhuCau = async (req, res) => {
    try {
        const { taikhoandki,manhucau } = req.body;
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await update({ manhucau, taikhoandki, id });
            if (result) {
                return res.status(200).json({
                    message: 'Update NhomLop ok',
                });
            } else {
                f;
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
}

module.exports = {
    apiGetDangKyNhuCauByName,
    apiCreateDangKyNhuCau,
    apiDeleteDangKyNhuCau,
    apiUpdateDangKyNhuCau,
    apiGetDangKyNhuCau,
    apiGetDangKyNhuCauById,
};
