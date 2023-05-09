const jwt = require('jsonwebtoken');
function Authorization(req) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        const isAdmin = decoded.data.username === 'admin';
        return isAdmin;
    } else {
        return false;
    }
}

module.exports = { Authorization };
