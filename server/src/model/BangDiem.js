const connection = require('../config/connect');

const getAll = async () => {
    const sql = 'select * from BangDiem';
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
    const sql = 'delete from BangDiem where id = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ tennhucau, id }) => {
    const sql = 'update BangDiem set tennhucau = ? where id = ?';
    try {
        const [result] = await connection.query(sql, [tennhucau, id]);
        return result;
    } catch (e) {
        return false;
    }
};

module.exports = { create, update, deleted, getAll };
