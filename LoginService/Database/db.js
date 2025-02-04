const { Pool } = require('pg')



const pool = new Pool({
    connectionString: process.env.DB_URI,
    ssl: {
        rejectUnauthorized: false, // Use this if connecting to a database with self-signed SSL certificates
    },
});

module.exports = pool;