const connection = require('../config/connect');

const getAll = async () => {
    const sql = 'SELECT * FROM account INNER JOIN student ON account.id = student.id_account ';
    try {
        const [result] = await connection.query(sql);
        return result;
    } catch (e) {
        return false;
    }
};

const create = async ({ masv, id_account, fullname, brithday, id_teacher, id_course, address, phone, email }) => {
    try {
        const sql = `select masv from student where masv = ?`;
        const [result] = await connection.query(sql, [masv]);
        if (Array.isArray(result) && result.length === 0) {
            const sql = 'insert into student values(?,?,?,?,?,?,?,?,?)';
            const [result] = await connection.query(sql, [
                masv,
                id_account,
                fullname,
                brithday,
                id_teacher,
                id_course,
                address,
                phone,
                email,
            ]);
            return result;
        } else {
            return { exists: true };
        }
    } catch {
        return false;
    }
};

const deleted = async ({ id }) => {
    const sql = 'delete from student where masv = ?';
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
    const sql = `SELECT * FROM account INNER JOIN student ON account.id = student.id_account limit ${limit} offset ${offset}`;
    try {
        const [result] = limit && page && (await connection.query(sql));
        return result;
    } catch (e) {
        return false;
    }
};

module.exports = { create, update, deleted, getAll, pagination };
