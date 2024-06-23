// This file creates Table for users table if not exist
import { pool } from "../../database/connection.js";

const query = `
   INSERT INTO exam_sets(title,description,year,subject,img_path)
   VALUES ('klon_selangor','kertas 1','2022','kimia','/subject-thumbnail/kimia.png');
`



async function createNewExamSet(req,res){
        try{
            const dbRes = await pool.query(query);
            console.log(dbRes.rows)
            console.log("createNewExamSet OK");
            res.status(201).json({
                message:`examset created!`,
            })
    
    
        }catch(error){
            console.error("error createNewExamSet :",error);
            res.status(500).json({
                message:`500: examset creation fails!`
            })    
        }
    }
    
    export default createNewExamSet;

