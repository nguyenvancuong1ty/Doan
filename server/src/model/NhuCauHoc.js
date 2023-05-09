const connection = require('../config/connect');

const getAll = async () => {
    const sql = 'select * from nhucauhoc';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ tennhucau }) => {
    const sql = 'insert into nhucauhoc(tennhucau) values(?)';
    try {
        const [result] = await connection.query(sql, [tennhucau]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'delete from nhucauhoc where id = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ tennhucau, id }) => {
    const sql = 'update nhucauhoc set tennhucau = ? where id = ?';
    try {
        const [result] = await connection.query(sql, [tennhucau, id]);
        return result;
    } catch (e) {
        return false;
    }
};

module.exports = { create, update, deleted, getAll };
