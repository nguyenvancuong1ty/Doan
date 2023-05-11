const connection = require('../config/connect');

const uploadAvatar = async ({ imgsrc, id }) => {
    try {
        const sql = 'update account set avata = ? where id = ?';
        const [result] = await connection.query(sql, [imgsrc, id]);
        return result;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
};
module.exports = { uploadAvatar };
