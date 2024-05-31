// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
        CREATE TABLE IF NOT EXISTS user_exam_attempts (
            attempt_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            examination_id INT REFERENCES exam_sets(examination_id) ON DELETE CASCADE,
            started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP
);

`

async function createUserAttemptTable(req,res){
        try{
            await pool.query(query);
            console.log("createUserAttemptTable OK");
    
    
        }catch(error){
            console.error("error createUserAttemptTable :",error);
           
    
        }
    }
    
    export default createUserAttemptTable;