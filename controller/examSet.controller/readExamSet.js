// This file creates Table for users table if not exist
import { pool } from "../../database/connection.js";

const query = `
   SELECT * FROM exam_sets
   WHERE examination_id= $1
   
`


async function readExamSet(req,res){
        try{
            const exam_set_id = req.params.exam_set_id

            const dbRes = await pool.query(query,[exam_set_id]);
            const data = dbRes.rows
            console.log(dbRes.rows)
            console.log("readExamSet OK");
            res.status(201).json({
                message:`examset created!`,
                data
            })
    
    
        }catch(error){
            console.error("error readExamSet :",error);
            res.status(500).json({
                message:`Internal Server Error`
            })
           
    
        }
    }
    
    export default readExamSet;

