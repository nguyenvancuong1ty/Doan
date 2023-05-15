const connection = require('../config/connect');

const login = async ({ username, email }) => {
    try {
        if (username) {
            const sql = 'select * from account where username = ?';
            const [result] = await connection.query(sql, [username]);
            return result;
        } else if (email) {
            const sql = `SELECT account.password,student.email  FROM account    JOIN student  ON account.id = student.id_account WHERE student.email = ?
                        UNION ALL 
                        SELECT account.password, teacher.email FROM account  JOIN teacher  ON account.id = teacher.id_account WHERE teacher.email = ?`;
            const [result] = await connection.query(sql, [email, email]);
            return result;
        } else return false;
    } catch (e) {
        return false;
    }
};

const getAll = async () => {
    const sql = 'select * from account where account.type_account != "admin" and deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ username, hash }) => {
    try {
        const sql = `select username from account where username = ?`;
        const [result] = await connection.query(sql, [username]);
        if (Array.isArray(result) && result.length === 0) {
            const sql = 'insert into account(username,password, type_account) values(?,?, "student")';
            const [result] = await connection.query(sql, [username, hash]);
            return result;
        } else {
            return { exists: true };
        }
    } catch {
        return false;
    }
    // const sql = 'insert into account(username,password, type_account) values(?,?, "student")';
    // try {
    //     const [result] = await connection.query(sql, [username, hash]);
    //     return result;
    // } catch (e) {
    //     return false;
    // }
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

const update = async ({ username, hash, avatar, id }) => {
    const sql = 'update account set username = ?,password = ?,avata = ? where id = ?';
    try {
        const [result] = await connection.query(sql, [username, hash, avatar, id]);
        return result;
    } catch (e) {
        return false;
    }
};

const pagination = async ({ limit, page }) => {
    const offset = (page - 1) * limit;
    const sql = `select * from account where account.type_account != "admin" limit ${limit} offset ${offset} `;
    try {
        const [result] = limit && page && (await connection.query(sql));
        return result;
    } catch (e) {
        return false;
    }
};

module.exports = { login, create, update, deleted, getAll, pagination };
