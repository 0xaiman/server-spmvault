// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
    CREATE TABLE IF NOT EXISTS figures (
    figure_id SERIAL PRIMARY KEY,
    figure_url TEXT NOT NULL,
    description TEXT
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