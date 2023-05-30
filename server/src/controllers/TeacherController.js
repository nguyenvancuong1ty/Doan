const { create, deleted, update, getAll, pagination, getById, getByName } = require('../model/Teacher');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetTeacherByName = async (req, res) => {
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
const apiGetTeacherById = async (req, res) => {
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
const apiGetTeacher = async (req, res) => {
    try {
        const result = await getAll();
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                data: result,
            });
        } else {
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

const apiCreateTeacher = async (req, res) => {
    try {
        const { magv, id_account, fullname, birthday } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await create({ magv, id_account, fullname, birthday });
            if (result) {
                if (result.exists) {
                    return res.status(409).json({
                        message: 'Teacher exists',
                    });
                }
                return res.status(200).json({
                    message: 'Create Teacher ok',
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

const apiDeleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await deleted({ id });
            console.log(result);
            if (result) {
                return res.status(200).json({
                    message: 'Delete Teacher ok',
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

const apiUpdateTeacher = async (req, res) => {
    try {
        const { id_account, fullname, birthday } = req.body;
        const { id } = req.params;
        const result = await update({ id_account, fullname, birthday, id });
        if (result) {
            return res.status(200).json({
                message: 'Update Teacher ok',
            });
        } else {
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

const apiTeacherPagination = async (req, res) => {
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
    apiCreateTeacher,
    apiDeleteTeacher,
    apiUpdateTeacher,
    apiGetTeacher,
    apiTeacherPagination,
    apiGetTeacherByName,
    apiGetTeacherById,
};
