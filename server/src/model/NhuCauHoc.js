const connection = require('../config/connect');

const getAll = async () => {
    const sql = 'select * from nhucauhoc where deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({manhucau, tennhucau }) => {
    const sql = 'insert into nhucauhoc(manhucau, tennhucau) values(?,?)';
    try {
        const [result] = await connection.query(sql, [manhucau,tennhucau]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'update nhucauhoc set deleted = true where manhucau = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ tennhucau, id }) => {
    const sql = 'update nhucauhoc set tennhucau = ? where manhucau = ?';
    try {
        const [result] = await connection.query(sql, [tennhucau, id]);
        return result;
    } catch (e) {
        return false;
    }
};

const pagination = async ({ limit, page }) => {
    const offset = (page - 1) * limit;
    const sql = `select * from nhucauhoc where deleted = false limit ${limit} offset ${offset}`;
    try {
        const [result] = limit && page && (await connection.query(sql));
        return result;
    } catch (e) {
        return false;
    }
};
const getById = async ({ id }) => {
    const sql = 'select * from nhucauhoc where deleted = false and manhucau = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const getByName = async ({ search }) => {
    console.log(search);
    const sql = `select * from nhucauhoc where tennhucau like '%${search.search}%' 
                 and deleted = false`;
    try {
        const [result] = await connection.query(sql, [search.search]);
        return result;
    } catch (e) {
        return false;
    }
};
module.exports = { create, update, deleted, getAll, pagination, getById, getByName };
