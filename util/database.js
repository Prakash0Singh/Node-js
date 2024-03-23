const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-db', 'root', 'prakash', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;

// const mySql = require('mysql2');

// const pool = mySql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-db',
//     password: 'prakash'
// });

// module.exports = pool.promise();