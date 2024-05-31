// This file creates Table for users table if not exist
import { pool } from "../../database/connection.js";

const query = `
   INSERT INTO questions(examination_id, question_text, chapter,form)
   VALUES (1,'Apakah kepentingan Alat Regalia kepada Kesultanan Melayu Melaka?','1','5');

`


async function insertQuestionIntoExamSet(req,res){
        try{
            const dbRes = await pool.query(query);
            console.log(dbRes.rows)
            console.log("insertQuestionIntoExamSet OK");
            res.status(201).json({
                message:`question inputted!`,
                dbRes
            })
    
    
        }catch(error){
            console.error("error insertQuestionIntoExamSet :",error);
            res.status(500).json({
                message:`500: examset creation fails!`
            })
           
    
        }
    }
    
    export default insertQuestionIntoExamSet;

