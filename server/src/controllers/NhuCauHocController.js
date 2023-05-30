const { create, deleted, update, getAll, pagination, getById, getByName } = require('../model/NhuCauHoc');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetNhuCauHocByName = async (req, res) => {
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
const apiGetNhuCauHocById = async (req, res) => {
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
const apiGetNhuCauHoc = async (req, res) => {
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

const apiCreateNhuCauHoc = async (req, res) => {
    try {
        const { tennhucau } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await create({ tennhucau });
            if (result) {
                return res.status(200).json({
                    message: 'Create NhuCauHoc ok',
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

const apiDeleteNhuCauHoc = async (req, res) => {
    try {
        const { id } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await deleted({ id });
            if (result) {
                return res.status(200).json({
                    message: 'Delete NhuCauHoc ok',
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

const apiUpdateNhuCauHoc = async (req, res) => {
    try {
        const { tennhucau } = req.body;
        const { id } = req.params;
        const result = await update({ tennhucau, id });
        if (result) {
            return res.status(200).json({
                message: 'Update NhuCauHoc ok',
            });
        } else {
            f;
            return res.status(404).json({
                message: 'Not found',
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const apiNhuCauHocPagination = async (req, res) => {
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
    apiCreateNhuCauHoc,
    apiDeleteNhuCauHoc,
    apiUpdateNhuCauHoc,
    apiGetNhuCauHoc,
    apiNhuCauHocPagination,
    apiGetNhuCauHocByName,
    apiGetNhuCauHocById,
};
