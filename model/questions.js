// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
CREATE TABLE IF NOT EXISTS questions (
    question_id SERIAL PRIMARY KEY,
    examination_id INT REFERENCES exam_sets(examination_id) ON DELETE CASCADE,
    question_text TEXT NOT NULL ,
    chapter TEXT,
    form TEXT,
    figure_id INT REFERENCES figures(figure_id) ON DELETE SET NULL, -- Optional if figures are used
    multi_choice TEXT[] , -- Optional if figures are used
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


`

async function createQuestionTable(req,res){
        try{
            await pool.query(query);
            console.log("createQuestionTable OK");
    
    
        }catch(error){
            console.error("error createQuestionTable :",error);
           
    
        }
    }
    
    export default createQuestionTable;