const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
    // Initial connection without database selected to create the DB if needed
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    try {
        console.log('Connecting to MySQL...');
        const dbName = process.env.DB_NAME || 'customer_app_db';
        
        console.log(`Ensuring database ${dbName} exists...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        await connection.query(`USE ${dbName}`);

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Cleaning up existing tables...');
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        await connection.query('DROP TABLE IF EXISTS application_logs');
        await connection.query('DROP TABLE IF EXISTS applications');
        await connection.query('DROP TABLE IF EXISTS profiles');
        await connection.query('DROP TABLE IF EXISTS users');
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('Executing schema...');
        await connection.query(schema);

        console.log('Database initialized successfully with AUTO_INCREMENT IDs!');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await connection.end();
    }
}

initializeDatabase();
