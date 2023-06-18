const jwt = require('jsonwebtoken');
function Authorization(req) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            const isAdmin = decoded.data.username === 'admin';
            return isAdmin;
        } catch (err) {
            console.error('JWT decoding error:', err);
            return false;
        }
    } else {
        return false;
    }
}

function isSupperAccount(req) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            const isAdmin = decoded.data.type_account === 'superAccount';
            return isAdmin;
        } catch (err) {
            console.error('JWT decoding error:', err.message);
            return false;
        }
    } else {
        return false;
    }
}

module.exports = { Authorization, isSupperAccount };
