// This file creates Table for users table if not exist
import { pool } from "../../database/connection.js";

const query = `
   SELECT title,subject,year,examination_id, img_path FROM exam_sets
   ORDER BY 2
      
`


async function readAllExamSet(req,res){
        try{
            // const exam_set_id = req.params.exam_set_id

            const dbRes = await pool.query(query);
            const data = dbRes.rows
           
            res.status(201).json({
                message:`examset read!`,
                data
            })
    
    
        }catch(error){
            console.error("error readExamSet :",error);
            res.status(500).json({
                message:`Internal Server Error`
            })
           
    
        }
    }
    
    export default readAllExamSet;

