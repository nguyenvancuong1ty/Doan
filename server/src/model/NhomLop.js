const connection = require('../config/connect');

const getAll = async () => {
    const sql = 'select * from nhomlop where deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ manhom, tennhom }) => {
    const sql = 'insert into nhomlop(manhom, tennhom) values(?,?)';
    try {
        const [result] = await connection.query(sql, [manhom, tennhom]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'update nhomlop set deleted = true where manhom = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ tennhom, id }) => {
    const sql = 'update nhomlop set tennhom =? where manhom = ?';
    try {
        const [result] = await connection.query(sql, [tennhom, id]);
        return result;
    } catch (e) {
        return false;
    }
};

const pagination = async ({ limit, page }) => {
    const offset = (page - 1) * limit;
    const sql = `select * from nhomlop where deleted = false limit ${limit} offset ${offset}`;
    try {
        const [result] = limit && page && (await connection.query(sql));
        return result;
    } catch (e) {
        return false;
    }
};

module.exports = { create, update, deleted, getAll, pagination };
