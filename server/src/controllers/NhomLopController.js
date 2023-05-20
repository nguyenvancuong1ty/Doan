const { create, deleted, update, getAll, pagination } = require('../model/NhomLop');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetNhomLopByName = async (req, res) => {
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
const apiGetNhomLop = async (req, res) => {
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

const apiCreateNhomLop = async (req, res) => {
    try {
        const { manhom, tennhom } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await create({ manhom, tennhom });
            if (result) {
                return res.status(200).json({
                    message: 'Create NhomLop ok',
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

const apiDeleteNhomLop = async (req, res) => {
    try {
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await deleted({ id });
            if (result) {
                return res.status(200).json({
                    message: 'Delete NhomLop ok',
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

const apiUpdateNhomLop = async (req, res) => {
    try {
        const { tennhom } = req.body;
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await update({ tennhom, id });
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
};

const apiNhomLopPagination = async (req, res) => {
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
    apiGetNhomLopByName,
    apiCreateNhomLop,
    apiDeleteNhomLop,
    apiUpdateNhomLop,
    apiGetNhomLop,
    apiNhomLopPagination,
};
