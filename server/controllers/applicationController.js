const pool = require('../config/db');

const createApplication = async (req, res) => {
    const { user_id, app_type, data_json } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO applications (user_id, app_type, data_json) VALUES (?, ?, ?)',
            [user_id, app_type, JSON.stringify(data_json)]
        );
        res.status(201).json({ app_id: result.insertId, message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getApplications = async (req, res) => {
    const { user_id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM applications WHERE user_id = ?', [user_id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStatus = async (req, res) => {
    const { app_id } = req.params;
    const { new_status, changed_by_user_id } = req.body;

    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            const [currentApp] = await connection.query('SELECT status FROM applications WHERE app_id = ?', [app_id]);
            const previous_status = currentApp[0].status;

            await connection.query(
                'UPDATE applications SET status = ? WHERE app_id = ?',
                [new_status, app_id]
            );

            await connection.query(
                'INSERT INTO application_logs (app_id, previous_status, new_status, changed_by_user_id) VALUES (?, ?, ?, ?)',
                [app_id, previous_status, new_status, changed_by_user_id]
            );

            await connection.commit();
            res.json({ message: 'Status updated successfully' });
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateApplication = async (req, res) => {
    const { app_id } = req.params;
    const { app_type, status, data_json } = req.body;
    try {
        await pool.query(
            'UPDATE applications SET app_type = ?, status = ?, data_json = ? WHERE app_id = ?',
            [app_type, status, JSON.stringify(data_json), app_id]
        );
        res.json({ message: 'Application updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteApplication = async (req, res) => {
    const { app_id } = req.params;
    try {
        await pool.query('DELETE FROM applications WHERE app_id = ?', [app_id]);
        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createApplication, getApplications, updateStatus, updateApplication, deleteApplication };
