import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { db }  from "../db/db-contacts.mjs";

const db_users = {

    createUser: async (username, password) => {
        let con;
        try {
            con = await db.connectToDatabase();
            const hashPwd = await bcrypt.hash(password, 10);
            const [result] = await con.query(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, hashPwd]);
            return {id: result.insertId, username};
        } catch(err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    getUserByUserName: async (login) => {
        //this syntax (prepared statement, parameters used in the query) prevents from SQL injections
        //const con = await connectToDatabase();
        let con;
        try {
            con = await db.connectToDatabase();
            const [rows] = await con.query('SELECT * FROM users WHERE username = ?', [login]);
            return rows[0];
        } catch(err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },
}

export { db_users }