// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
    CREATE TABLE IF NOT EXISTS users 
    (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        school_name VARCHAR(255),
        school_type VARCHAR(50) CHECK (school_type IN ('primary', 'secondary')),
        grade VARCHAR(50),
        age INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
);
`

async function createUserTable(req,res){
    try{
        await pool.query(query);
        console.log("createUserTable OK");


    }catch(error){
        console.error("error createUserTable :",error);
       

    }
}

export default createUserTable;