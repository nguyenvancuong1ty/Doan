const connection = require('../config/connect');

const getAll = async () => {
    const sql = 'select * from dkinhucauhoc join account on account.id = dkinhucauhoc.taikhoandki left join nhucauhoc on nhucauhoc.manhucau = dkinhucauhoc.manhucau where dkinhucauhoc.deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ madangky, taikhoandki, manhucau }) => {
    const sql = 'insert into dkinhucauhoc(madangky, taikhoandki, manhucau) values(?,?,?)';
    try {
        const [result] = await connection.query(sql, [madangky, taikhoandki, manhucau]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'update dkinhucauhoc set deleted = true where madangky = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ manhucau, madangky, taikhoandki }) => {
    const sql = 'update dkinhucauhoc set manhucau = ?,taikhoandki = ? where madangky = ?';
    try {
        const [result] = await connection.query(sql, [manhucau,taikhoandki, madangky]);
        return result;
    } catch (e) {
        return false;
    }
};
const getById = async ({ id }) => {
    const sql = 'select * from dkinhucauhoc join account on account.id = dkinhucauhoc.taikhoandki left join nhucauhoc on nhucauhoc.manhucau = dkinhucauhoc.manhucau where dkinhucauhoc.deleted = false and madangky = ?';
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
