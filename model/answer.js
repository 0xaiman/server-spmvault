// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
        CREATE TABLE IF NOT EXISTS answers (
        answer_id SERIAL PRIMARY KEY,
        question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,
        answer_text TEXT NOT NULL,
        is_correct BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
    
);

`

async function createAnswerTable(req,res){
        try{
            await pool.query(query);
            console.log("createAnswerTable OK");
    
    
        }catch(error){
            console.error("error createAnswerTable :",error);
           
    
        }
    }
    
    export default createAnswerTable;