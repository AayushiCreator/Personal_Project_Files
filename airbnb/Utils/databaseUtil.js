const mysql = require('mysql2')

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Aayushi@123',
    database : 'airbnb'
})

// Test the connection and create table if needed
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to MySQL database');

});

module.exports = pool.promise();