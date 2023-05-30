const connection = require('../config/connect');

const getAll = async () => {
    const sql = 'select * from dknhucauhoc where deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ ngaydangky, taikhoandki, manhucau }) => {
    const sql = 'insert into dknhucauhoc(ngaydangky, taikhoandki, manhucau) values(?)';
    try {
        const [result] = await connection.query(sql, [ngaydangky, taikhoandki, manhucau]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'update dknhucauhoc set deleted = true where madangky = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ tennhucau, id }) => {
    const sql = 'update dknhucauhoc set tennhucau = ? where id = ?';
    try {
        const [result] = await connection.query(sql, [tennhucau, id]);
        return result;
    } catch (e) {
        return false;
    }
};
const getById = async ({ id }) => {
    const sql = 'select * from dkinhucauhoc where deleted = false and madangky = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const getByName = async ({ search }) => {
    console.log(search);
    const sql = 'select * from dkinhucauhoc where deleted = false and taikhoandki = ?';
    try {
        const [result] = await connection.query(sql, [search.search]);
        return result;
    } catch (e) {
        return false;
    }
};
module.exports = { create, update, deleted, getAll, getById, getByName };
