const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { create, deleted, update, getAll, pagination } = require('../model/DiemDanh');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetDiemDanh = async (req, res) => {
    try {
        const result = await getAll();
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

const apiCreateDiemDanh = async (req, res) => {
    try {
        const { id_student, id_course, status } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await create({ id_student, id_course, status });
            if (result) {
                return res.status(200).json({
                    message: 'Create DiemDanh ok',
                });
            } else {
                return res.status(404).json({
                    message: 'Data not found',
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

const apiDeleteDiemDanh = async (req, res) => {
    try {
        const { id } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await deleted({ id });
            if (result) {
                return res.status(200).json({
                    message: 'Create DiemDanh ok',
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

const apiUpdateDiemDanh = async (req, res) => {
    try {
        const { id_student, id_course, status } = req.body;
        const { id } = req.params;
        const result = await update({ id_student, id_course, status, id });
        if (result) {
            return res.status(200).json({
                message: 'Update DiemDanh ok',
            });
        } else {
            f;
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

const apiDiemDanhPagination = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const result = await pagination({ limit, page });
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

module.exports = { apiCreateDiemDanh, apiDeleteDiemDanh, apiUpdateDiemDanh, apiGetDiemDanh, apiDiemDanhPagination };
