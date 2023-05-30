const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { create, deleted, update, getAll, pagination, getById, getByName } = require('../model/BangDiem');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetBangDiemById = async (req, res) => {
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
const apiGetBangDiemByName = async (req, res) => {
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

const apiGetBangDiem = async (req, res) => {
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

const apiCreateBangDiem = async (req, res) => {
    try {
        const { masv, diemA, diemB, diemC } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await create({ masv, diemA, diemB, diemC });
            if (result) {
                return res.status(200).json({
                    message: 'Create BangDiem ok',
                });
            } else {
                return res.status(404).json({
                    message: 'Not found',
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

const apiDeleteBangDiem = async (req, res) => {
    try {
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await deleted({ id });
            if (result) {
                return res.status(200).json({
                    message: 'Delete BangDiem ok',
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

const apiUpdateBangDiem = async (req, res) => {
    try {
        const { masv, diemA, diemB, diemC } = req.body;
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await update({ masv, diemA, diemB, diemC, id });
            if (result) {
                return res.status(200).json({
                    message: 'Update BangDiem ok',
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
};

const apiBangDiemPagination = async (req, res) => {
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

module.exports = {
    apiGetBangDiemByName,
    apiCreateBangDiem,
    apiDeleteBangDiem,
    apiUpdateBangDiem,
    apiGetBangDiem,
    apiBangDiemPagination,
    apiGetBangDiemById,
};
