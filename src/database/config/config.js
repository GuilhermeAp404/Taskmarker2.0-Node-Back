require('dotenv').config()
module.exports = {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": 'mysql',
};
