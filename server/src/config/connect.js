const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)

require('dotenv').config();
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 100,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
});

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;
