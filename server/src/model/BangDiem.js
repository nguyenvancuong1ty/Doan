const connection = require('../config/connect');

const getAll = async () => {
    const sql = 'select * from BangDiem where deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ masv, diemA, diemB, diemC }) => {
    const sql = 'insert into BangDiem(masv, diemA, diemB, diemC) values(?,?,?,?)';
    try {
        const [result] = await connection.query(sql, [masv, diemA, diemB, diemC]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'update BangDiem set deleted = true where id = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ masv, diemA, diemB, diemC, id }) => {
    const sql = 'update BangDiem set masv =?, diemA =?, diemB =?, diemC = ? where id = ?';
    try {
        const [result] = await connection.query(sql, [masv, diemA, diemB, diemC, id]);
        return result;
    } catch (e) {
        return false;
    }
};

const pagination = async ({ limit, page }) => {
    const offset = (page - 1) * limit;
    const sql = `select * from bangdiem where bangdiem.deleted = false limit ${limit} offset ${offset}`;
    try {
        const [result] = limit && page && (await connection.query(sql));
        return result;
    } catch (e) {
        return false;
    }
};


module.exports = { create, update, deleted, getAll, pagination };
