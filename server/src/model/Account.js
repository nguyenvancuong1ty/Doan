const connection = require('../config/connect');

const login = async ({ username }) => {
    const sql = 'select * from account where username = ? ';
    try {
        const [result] = await connection.query(sql, [username]);
        return result;
    } catch (e) {
        return false;
    }
};

const getAll = async () => {
    const sql = 'select * from account where account.type_account != "admin"';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ username, hash }) => {
    const sql = 'insert into account(username,password, type_account) values(?,?, "student")';
    try {
        const [result] = await connection.query(sql, [username, hash]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'delete from account where id = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ username, hash, id }) => {
    const sql = 'update account set username = ?,password = ? where id = ?';
    try {
        const [result] = await connection.query(sql, [username, hash, id]);
        return result;
    } catch (e) {
        return false;
    }
};

module.exports = { login, create, update, deleted, getAll };
