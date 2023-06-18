const connection = require('../config/connect');

const getAll = async () => {
    const sql =
        'SELECT * FROM account INNER JOIN Teacher ON account.id = Teacher.id_account where Teacher.deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ magv, id_account, fullname, birthday }) => {
    try {
        const sql = `select magv from Teacher where magv = ?`;
        const [result] = await connection.query(sql, [magv]);
        if (Array.isArray(result) && result.length === 0) {
            const sql = 'insert into Teacher(magv, id_account, fullname, birthday) values(?,?,?,?)';
            const [result] = await connection.query(sql, [magv, id_account, fullname, birthday]);
            return result;
        } else {
            return { exists: true };
        }
    } catch {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'update Teacher set deleted = true where magv = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ id_account, fullname, birthday, id }) => {
    const sql = 'update Teacher set id_account = ?,fullname = ?,birthday = ? where magv = ?';
    try {
        const [result] = await connection.query(sql, [id_account, fullname, birthday, id]);
        return result;
    } catch (e) {
        return false;
    }
};

const pagination = async ({ limit, page }) => {
    const offset = (page - 1) * limit;
    const sql = `SELECT * FROM account INNER JOIN Teacher ON account.id = Teacher.id_account where Teacher.deleted = false limit ${limit} offset ${offset}`;
    try {
        const [result] = limit && page && (await connection.query(sql));
        return result;
    } catch (e) {
        return false;
    }
};
const getById = async ({ id }) => {
    const sql = 'select * from teacher where deleted = false and magv = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const getByName = async ({ search }) => {
    console.log(search);
    const sql = `select * from teacher where fullname like '%${search.search}%' 
                 and deleted = false`;
    try {
        const [result] = await connection.query(sql, [search.search]);
        return result;
    } catch (e) {
        return false;
    }
};
module.exports = { create, update, deleted, getAll, pagination, getById, getByName };
