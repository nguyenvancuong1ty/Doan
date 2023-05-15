const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { create, deleted, update, getAll, pagination, getByName } = require('../model/Lop');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetLopByName = async (req, res) => {
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

const apiGetLop = async (req, res) => {
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

const apiCreateLop = async (req, res) => {
    try {
        const { malop, tenlop, manhom } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await create({ malop, tenlop, manhom });
            if (result) {
                return res.status(200).json({
                    message: 'Create Lop ok',
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

const apiDeleteLop = async (req, res) => {
    try {
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await deleted({ id });
            if (result) {
                return res.status(200).json({
                    message: 'Delete Lop ok',
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

const apiUpdateLop = async (req, res) => {
    try {
        const { tenlop, manhom } = req.body;
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await update({ tenlop, manhom, id });
            if (result) {
                return res.status(200).json({
                    message: 'Update Lop ok',
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

const apiLopPagination = async (req, res) => {
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

module.exports = { apiCreateLop, apiDeleteLop, apiUpdateLop, apiGetLop, apiGetLopByName, apiLopPagination };
