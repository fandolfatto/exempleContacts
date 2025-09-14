import mysql from 'mysql2/promise';



const db = {

    connectToDatabase :async () => {
        const con = mysql.createConnection({
            host: "localhost",
            user: "root", //use another user
            password: "P@ssw0rd",
            port: 3308, //usually we use the 3306 port
            database: "app_contacts",
        });
        return con;
    },

    getAllContacts: async () => {
        let con;
        try {
            //the getAllContacts function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            con = await db.connectToDatabase();
            const [rows] = await con.query('SELECT * FROM contacts');
            return rows;
        } catch(err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    getContactById: async ( id) => {
        //this syntax (prepared statement, parameters used in the query) prevents from SQL injections
        //const con = await connectToDatabase();
        let con;
        try {
            con = await db.connectToDatabase();
            const [rows] = await con.query('SELECT * FROM contacts WHERE id = ?', [id]);
            return rows[0];
        } catch(err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    createContact: async ( {name, email}) => {
        let con;
        try {
            con = await db.connectToDatabase();
            const [result] = await con.query(
                'INSERT INTO contacts (name, email) VALUES (?, ?)',
                [name, email]);
            return {id: result.insertId, name, email};
        } catch(err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    updateContact: async (id, {name, email}) => {
        let con;
        try {
            con = await db.connectToDatabase();
            const [result] = await con.query(
                'UPDATE contacts SET name = ?, email = ? WHERE id = ?',
                [name, email, id]
            );
            return result.affectedRows;
        } catch(err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    deleteContact: async (id) => {
        let con;
        try {
            con = await db.connectToDatabase();
            const [result] = await con.query('DELETE FROM contacts WHERE id = ?', [id]);
            if (result.affectedRows > 0) {
                return {success: true};
            } else {
                return {success: false};
            }
        } catch(err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    disconnectFromDatabase: async (connection) => {
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