// const query = `
//     INSERT into profile_picture(field_name,original_name,encoding,mimetype,destination,file_name,path,size)
//     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
//     ;
// `   

// This file creates Table for users table if not exist
import { pool } from "../database/connection.js";

const query = `
    CREATE TABLE IF NOT EXISTS profile_picture (
    figure_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
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

async function createProfilePicture(req,res){
        try{
            await pool.query(query);
            console.log("createProfilePicture OK");
    
    
        }catch(error){
            console.error("error createProfilePicture :",error);
           
    
        }
    }
    
    export default createProfilePicture;