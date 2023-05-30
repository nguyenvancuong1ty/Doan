const connection = require('../config/connect');

const getById = async ({ id }) => {
    const sql = 'select * from bangdiem where deleted = false and id = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const getByName = async ({ search }) => {
    console.log(search);
    const sql = 'select * from bangdiem where deleted = false and masv = ?';
    try {
        const [result] = await connection.query(sql, [search.search]);
        return result;
    } catch (e) {
        return false;
    }
};

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

module.exports = { create, update, deleted, getAll, pagination, getById, getByName };
