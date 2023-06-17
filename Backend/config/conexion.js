require('dotenv').config();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbUser,
  password: process.env.dbPass,
  database: process.env.dbName
});

connection.connect();

module.exports = connection;