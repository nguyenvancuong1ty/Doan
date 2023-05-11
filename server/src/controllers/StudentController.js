const bcrypt = require('bcryptjs');
const { create, deleted, update, getAll, pagination } = require('../model/Student');
const { Authorization } = require('../middleware/Authorization');
require('dotenv').config();

const apiGetStudent = async (req, res) => {
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

const apiCreateStudent = async (req, res) => {
    try {
        const { id_account, fullname, brithday, id_teacher, id_course, address, phone, email } = req.body;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await create({
                id_account,
                fullname,
                brithday,
                id_teacher,
                id_course,
                address,
                phone,
                email,
            });
            if (result) {
                if (result.exists) {
                    return res.status(409).json({
                        message: 'Student exists',
                    });
                }
                return res.status(200).json({
                    message: 'Create Student ok',
                });
            } else {
                return res.status(404).json({
                    message: 'not found',
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

const apiDeleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const isAdmin = Authorization(req);
        if (isAdmin) {
            const result = await deleted({ id });
            console.log(result);
            if (result) {
                return res.status(200).json({
                    message: 'Delete Student ok',
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

const apiUpdateStudent = async (req, res) => {
    try {
        const { id_account, fullname, brithday, id_teacher, id_course, address, phone, email } = req.body;
        const { id } = req.params;
        const hash = bcrypt.hashSync(password, 8);
        const result = await update({
            id_account,
            fullname,
            brithday,
            id_teacher,
            id_course,
            address,
            phone,
            email,
            id,
        });
        console.log(result);
        if (result) {
            return res.status(200).json({
                message: 'Update Student ok',
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

const apiStudentPagination = async (req, res) => {
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
    apiCreateStudent,
    apiDeleteStudent,
    apiUpdateStudent,
    apiGetStudent,
    apiStudentPagination,
};
