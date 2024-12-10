import dotenv from "dotenv";
dotenv.config()
import mysql from "mysql2";


// create db connection
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();
//test connection
pool.getConnection()
    .then(connection => {
        console.log("Connected to MySQL database successfully!");
        // You can perform further actions with the connection here if needed
        connection.release(); // Release the connection when done
    })
    .catch(error => {
        console.error("Error connecting to MySQL database:", error);
    });




//TODO get one user without password
export async function getOneUser(username) {
    const [rows] = await pool.query(`
    SELECT id, username, age FROM spelling_app_users WHERE username = ?`
        , [username]);
    return rows[0];
}


//TODO get one user with password
export async function getOneUserAndPassword(username) {
    const [rows] = await pool.query(`
    SELECT * FROM spelling_app_users WHERE username = ?`
        , [username]);
    return rows[0];
}


//TODO create user
export async function createUser(user) {
    const { username, password, age } = user;

    // Check if the username already exists in the database
    const [existingUser] = await pool.query(`
    SELECT * FROM spelling_app_users WHERE username = ?
    `, [username]);

    if (existingUser.length > 0) {
        throw new Error('Username already exists!');
    }


    // Insert the new user into the database with the generated ID
    const [result] = await pool.query(
        `INSERT INTO spelling_app_users (username, password, age)
        VALUES (?, ?, ?)`,
        [username, password, age]
    );


    // Retrieve the newly created user from the database and return it
    const [newUser] = await pool.query(
        `SELECT id, username, password, age 
        FROM spelling_app_users WHERE username = ?`,
        [username]
    );

    return newUser;
}