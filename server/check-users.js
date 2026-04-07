const path = require('path');
require('dotenv').config();
const pool = require('./config/db');

async function checkUsers() {
    try {
        const [rows] = await pool.query('SELECT user_id, email, role FROM users');
        console.log('Users in database:', JSON.stringify(rows, null, 2));
    } catch (error) {
        console.error('Error querying users:', error.message);
    } finally {
        process.exit();
    }
}

checkUsers();
