// This file creates Table for users table if not exist
import { pool } from "../../database/connection.js";

// const query = `
//    UPDATE questions
//    SET chapter =$1 , form=$2
//    where question_id = $3
// `
const query = `
   UPDATE questions
   SET multi_choice =$1 
   where question_id = $2
`


async function updateQuestionData(req,res){
        try{
            const question_id = req.body.question_id;
            const multi_choice = req.body.multi_choice;

            await pool.query(query,[multi_choice,question_id]);
            console.log("updateQuestionData OK");
            res.status(201).json({
                message:`question ${question_id} updated!`,
                question_id,
                multi_choice        
            })
    
    
        }catch(error){
            console.error("error updateQuestionData :",error);
            res.status(500).json({
                message:`500: examset creation fails!`
            })
           
    
        }
    }
    
    export default updateQuestionData;

