const connection = require('../config/connect');
const date = new Date().toISOString().slice(0, 10);

const getAll = async () => {
    const sql = 'select * from course where deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const pagination = async ({ limit, page }) => {
    const offset = (page - 1) * limit;
    const sql = `select * from course where deleted = false limit ${limit} offset ${offset}`;
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ name, description, status }) => {
    const sql = 'insert into course(name,description, status) values(?,?,?)';
    try {
        const [result] = await connection.query(sql, [name, description, status]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'update course set deleted = true where id = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ name, description, status, id }) => {
    const sql = 'update course set name = ?,description = ?, status = ? where id = ?';
    try {
        const [result] = await connection.query(sql, [name, description, status, id]);
        return result;
    } catch (e) {
        return false;
    }
};

const getById = async ({ id }) => {
    const sql = 'select * from course where deleted = false and id = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const getByName = async ({ search }) => {
    console.log(search);
    const sql = `select * from course where name like '%${search.search}%' 
                 and deleted = false`;
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

module.exports = { create, update, deleted, getAll, pagination, getById, getByName };
