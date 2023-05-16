const connection = require('../config/connect');

const getAll = async () => {
    const sql = 'select * from Lop inner join nhomlop on lop.manhom = nhomlop.manhom where lop.deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const getByName = async ({ search }) => {
    const sql = `select * from Lop inner join nhomlop
                 on lop.manhom = nhomlop.manhom where lop.tenlop like '%${search.search}%' 
                 and lop.deleted = false`;
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ malop, tenlop, manhom }) => {
    const sql = 'insert into Lop(malop, tenlop, manhom) values(?,?,?)';
    try {
        const [result] = await connection.query(sql, [malop, tenlop, manhom]);
        return result;
    } catch (e) {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'update Lop set deleted = true where id = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ tenlop, manhom, id }) => {
    const sql = 'update Lop set malop =?, tenlop =?, manhom =? where malop = ?';
    try {
        const [result] = await connection.query(sql, [tenlop, manhom, id]);
        return result;
    } catch (e) {
        return false;
    }
};

const pagination = async ({ limit, page }) => {
    const offset = (page - 1) * limit;
    const sql = `select * from Lop where deleted = false limit ${limit} offset ${offset}`;
    try {
        const [result] = limit && page && (await connection.query(sql));
        return result;
    } catch (e) {
        return false;
    }
};

module.exports = { create, update, deleted, getAll, getByName, pagination };
