// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
    CREATE TABLE IF NOT EXISTS figures (
    figure_id SERIAL PRIMARY KEY,
    field_name VARCHAR(255),
    original_name VARCHAR(255),
    encoding VARCHAR(255),
    mimetype VARCHAR(255),
    destination VARCHAR(255),
    file_name VARCHAR(255),
    path TEXT,
    size INT
);

`

async function createFigureTable(req,res){
        try{
            await pool.query(query);
            console.log("createFigureTable OK");
    
    
        }catch(error){
            console.error("error createFigureTable :",error);
           
    
        }
    }
    
    export default createFigureTable;