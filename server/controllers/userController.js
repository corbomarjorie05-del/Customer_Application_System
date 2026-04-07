const pool = require('../config/db');

const register = async (req, res) => {
    const { email, password_hash, first_name, last_name } = req.body;
    console.log(`Registration attempt for: ${email}`);

    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Insert user and get the auto-incremented user_id
            const [userResult] = await connection.query(
                'INSERT INTO users (email, password_hash) VALUES (?, ?)',
                [email, password_hash]
            );
            
            const user_id = userResult.insertId;

            // Insert profile using the new user_id
            await connection.query(
                'INSERT INTO profiles (user_id, first_name, last_name) VALUES (?, ?, ?)',
                [user_id, first_name, last_name]
            );

            await connection.commit();
            console.log(`User registered successfully: ${email} (ID: ${user_id})`);
            res.status(201).json({ user_id, message: 'User registered successfully' });
        } catch (error) {
            await connection.rollback();
            console.error(`Registration database error for ${email}:`, error.message);
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password_hash } = req.body;
    console.log(`Login attempt for: ${email}`);
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password_hash = ?', [email, password_hash]);
        if (rows.length > 0) {
            console.log(`Login successful for: ${email}`);
            res.json(rows[0]);
        } else {
            console.warn(`Login failed: Invalid credentials for ${email}`);
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(`Login error for ${email}:`, error.message);
        res.status(500).json({ error: error.message });
    }
};

const getProfile = async (req, res) => {
    const { user_id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM profiles WHERE user_id = ?', [user_id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login, getProfile };
