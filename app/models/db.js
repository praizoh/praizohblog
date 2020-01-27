const mysql = require('mysql2/promise');
const dbConfig = require("../config/db.config.js");

// Create Connection to the database
const db = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    waitForConnections:dbConfig.waitForConnections,
    // conectionLimit:dbConfig.conectionLimit,
    queueLimit:dbConfig.queueLimit
});

// Open the Mysql Connection
// db.connect((err) => {
//     if(err){
//         console.log('db connection failed \n Error:' +JSON.stringify(err));
//     }
//     console.log('MySql Connected...');
// });
const connection = db;

module.exports = connection;
