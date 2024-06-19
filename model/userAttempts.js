// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
        CREATE TABLE IF NOT EXISTS user_exam_attempts (
            attempt_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            username VARCHAR(50),
            subject VARCHAR(50),
            examination_id INT REFERENCES exam_sets(examination_id) ON DELETE CASCADE,
            time_taken TEXT,
            score NUMERIC(4,1)
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