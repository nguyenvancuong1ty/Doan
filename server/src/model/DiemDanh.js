const connection = require('../config/connect');
const date = new Date().toISOString().slice(0, 10);

const getAll = async () => {
    const sql = 'select * from diemdanh';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const pagination = async ({ limit, page }) => {
    const offset = (page - 1) * limit;
    const sql = `select * from diemdanh limit ${limit} offset ${offset}`;
    try {
        const [result] = limit && page && (await connection.query(sql));
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ id_student, id_course, status }) => {
    const sql = 'insert into DiemDanh(id_student,id_course,date, status) values(?,?,?,?)';
    try {
        const [result] = await connection.query(sql, [id_student, id_course, date, status]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'delete from DiemDanh where id = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ id_student, id_course, status, id }) => {
    const sql = 'update DiemDanh set id_student = ?,id_course = ?,date = ?, status = ? where id = ?';
    try {
        const [result] = await connection.query(sql, [id_student, id_course, date, status, id]);
        return result;
    } catch (e) {
        return false;
    }
};

module.exports = { create, update, deleted, getAll, pagination };
