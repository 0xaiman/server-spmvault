// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
    CREATE TABLE IF NOT EXISTS exam_sets (
    examination_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL ,
    subject TEXT,
    description TEXT,
    year INT NOT NULL,
    img_path TEXT ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answerList TEXT[]
);

`

async function createExamSetTable(req,res){
        try{
            await pool.query(query);
            console.log("createExamSetTable OK");
    
    
        }catch(error){
            console.error("error createExamSetTable :",error);
           
    
        }
    }
    
    export default createExamSetTable;