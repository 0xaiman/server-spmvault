// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
    CREATE TABLE IF NOT EXISTS firebase_figure (
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

async function createFirebaseFigureTable(req,res){
        try{
            await pool.query(query);
            console.log("createFirebaseFigureTable Table OK");
        }catch(error){
            console.error("error createFirebaseFigureTable  :",error);
        }
    }
    
    export default createFirebaseFigureTable;