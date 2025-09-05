import mysql from 'mysql2/promise';

const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "P@ssw0rd",
    port:3308,
    database: "app_contacts",
});

const db = {

    getAllContacts: async () => {
        const [rows] = await con.query('SELECT * FROM contacts');
        return rows;
    },

    getContactById: async ( id) => {
        const [rows] = await con.query('SELECT * FROM contacts WHERE id = ?', [id]);
        return rows[0];
    },

    createContact: async ( {name, email}) => {
        const [result] = await con.query(
            'INSERT INTO contacts (name, email) VALUES (?, ?)',
            [name, email]
        );
        return {id: result.insertId, name, email};
    },

    updateContact: async (id, {name, email}) => {
        await con.query(
            'UPDATE contacts SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
        return {id, name, email};
    },

    deleteContact: async (id) => {
        await con.query('DELETE FROM contacts WHERE id = ?', [id]);
        return {success: true};
    },
}

export { db }