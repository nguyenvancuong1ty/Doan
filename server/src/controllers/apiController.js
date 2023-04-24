const connection = require('../config/connect');
const AccountController = require('./AccountController');

const apiGetUsers = async (req, res) => {
    const sql = 'select * from account';
    const [result, fields] = await connection.query(sql);
    return res.status(200).json({
        statusCode: 200,
        data: result,
    });
};

module.exports = {
    apiGetUsers,
};
