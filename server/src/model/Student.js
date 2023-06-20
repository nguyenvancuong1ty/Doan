const connection = require('../config/connect');
const bcrypt = require('bcryptjs');
const getAll = async () => {
    const sql =
        'SELECT * FROM account INNER JOIN student ON account.id = student.id_account where student.deleted = false';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({
    masv,
    id_account,
    fullname,
    brithday,
    id_teacher,
    id_course,
    address,
    phone,
    email,
    username,
    password,
}) => {
    try {
        const sql = `select masv from student where masv = ?`;
        const hash = bcrypt.hashSync(password, 8);
        const [result] = await connection.query(sql, [masv]);
        const sql2 = `select username from account where username = ? or id = ?`;
        const [result2] = await connection.query(sql2, [username, id_account]);
        console.log('osôs', result2);
        if (Array.isArray(result) && result.length === 0 && Array.isArray(result2) && result2.length === 0) {
            const sql2 = 'insert into account(id,username,password, type_account) values(?,?,?, "student")';
            let resultTotal = [];
            const result1 = await connection.query(sql2, [id_account, username, hash]);
            resultTotal.push(result1);

            const sql = 'insert into student values(?,?,?,?,?,?,?,?,?,?)';
            await connection.query(sql, [
                masv,
                id_account,
                fullname,
                brithday,
                id_teacher,
                id_course,
                address,
                phone,
                email,
                false,
            ]);
            resultTotal.push(result2);
            console.log(resultTotal);
            return resultTotal;
        } else {
            return { exists: true };
        }
    } catch (error) {
        // await connection.query('rollback');
        throw error;
    }
};

const deleted = async ({ id }) => {
    const sql = 'update student set deleted = true where masv = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const update = async ({ id, id_account, fullname, brithday, id_teacher, id_course, address, phone, email }) => {
    const sql =
        'update student set id_account =?, fullname = ?, brithday = ?, id_teacher = ?, id_course = ?, address = ?, phone = ?, email = ? where masv = ?';
    try {
        const [result] = await connection.query(sql, [
            id_account,
            fullname,
            brithday,
            id_teacher,
            id_course,
            address,
            phone,
            email,
            id,
        ]);
        return result;
    } catch (e) {
        return false;
    }
};

const pagination = async ({ limit, page }) => {
    const offset = (page - 1) * limit;
    const sql = `SELECT * FROM account INNER JOIN student ON account.id = student.id_account where student.deleted = false limit ${limit} offset ${offset}`;
    try {
        const [result] = limit && page && (await connection.query(sql));
        return result;
    } catch (e) {
        return false;
    }
};
const getById = async ({ id }) => {
    const sql = 'select * from student where deleted = false and masv = ?';
    try {
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (e) {
        return false;
    }
};

const getByName = async ({ search }) => {
    console.log(search);
    const sql = `select * from student where fullname like '%${search.search}%' 
                 and deleted = false`;
    try {
        const [result] = await connection.query(sql, [search.search]);
        return result;
    } catch (e) {
        return false;
    }
};
module.exports = { create, update, deleted, getAll, pagination, getById, getByName };
