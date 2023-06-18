const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { create, deleted, update, getAll, pagination, getById, getByName } = require('../model/Course');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetCourseByName = async (req, res) => {
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
const apiGetCourseById = async (req, res) => {
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

const apiGetCourse = async (req, res) => {
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

const apiCreateCourse = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await create({ name, description, status });
            if (result) {
                return res.status(200).json({
                    message: 'Create Course ok',
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

const apiDeleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await deleted({ id });
            if (result) {
                return res.status(200).json({
                    message: 'Delete Course ok',
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

const apiUpdateCourse = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const { id } = req.params;
        const result = await update({ name, description, status, id });
        if (result) {
            return res.status(200).json({
                message: 'Update Course ok',
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

const apiCoursePagination = async (req, res) => {
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
    apiGetCourseByName,
    apiCreateCourse,
    apiDeleteCourse,
    apiUpdateCourse,
    apiGetCourse,
    apiCoursePagination,
    apiGetCourseById,
};
