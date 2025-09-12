import mysql from 'mysql2/promise';

const db = {


    connectToDatabase : async () => {
        const con = await mysql.createConnection({
            host: "localhost",
            user: "root", //use another user
            password: "P@ssw0rd",
            port: 3308, //usually we use the 3306 port
            database: "app_contacts",
        });
        return con;
    },

    getAllContacts: async () => {
        //the getAllContacts function waits until the query is finished to execute
        //if there is some code after the call of this function, it will be executed without waiting the execution of this function
        const con = await db.connectToDatabase();
        const [rows] = await con.query('SELECT * FROM contacts');
        db.disconnectFromDatabase(con);
        return rows;
    },

    getContactById: async ( id) => {
        //this syntax (prepared statement, parameters used in the query) prevents from SQL injections
        const con = await db.connectToDatabase();
        const [rows] = await con.query('SELECT * FROM contacts WHERE id = ?', [id]);
        return rows[0];
    },

    createContact: async ( {name, email}) => {
        const con = await db.connectToDatabase();
        const [result] = await con.query(
            'INSERT INTO contacts (name, email) VALUES (?, ?)',
            [name, email]
        );
        return {id: result.insertId, name, email};
    },

    updateContact: async (id, {name, email}) => {
        const con = await db.connectToDatabase();
        const [result] = await con.query(
            'UPDATE contacts SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
        return result.affectedRows;
    },

    deleteContact: async (id) => {
        const con = await db.connectToDatabase();
        const [result] = await con.query('DELETE FROM contacts WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            return {success: true};
        } else {
            return {success: false};
        }
    },

    disconnectFromDatabase : async (connection) => {
        try {
            await connection.end();
            console.log('Déconnexion de la base de données réussie');
        } catch (error) {
            console.error('Erreur lors de la déconnexion de la base de données :', error);
            throw error;
        }
    }
}

export { db }