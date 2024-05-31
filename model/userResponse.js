// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
        CREATE TABLE IF NOT EXISTS user_response (
            response_id SERIAL PRIMARY KEY,
            attempt_id INT REFERENCES user_exam_attempts(attempt_id) ON DELETE CASCADE,
            question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,
            answer_id INT REFERENCES answers(answer_id) ON DELETE SET NULL,
            responded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`

async function createUserResponseTable(req,res){
        try{
            await pool.query(query);
            console.log("createUserResponseTable OK");
    
    
        }catch(error){
            console.error("error createUserResponseTable :",error);
           
    
        }
    }
    
    export default createUserResponseTable;