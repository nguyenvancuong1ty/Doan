const connection = require('../config/connect');

const login = async ({ res, username, password }) => {
    const sql = 'select * from account where username = ? and password = ?';
    try {
        const [result] = await connection.query(sql, [username, password]);
        return result;
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = { login };
