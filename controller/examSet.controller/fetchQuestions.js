// This file creates Table for users table if not exist
import { pool } from "../../database/connection.js";

//confirmation if requested query exist in DB Table exam_sets
const queryCheckExist = `
   SELECT examination_id,subject,title
    FROM exam_sets
   WHERE examination_id= $1 AND subject= $2;
   
`

async function fetchQuestions(req,res){
        try{
            
            //extarct requested data from params
            const exam_set_id = req.params.exam_id
            const subject = req.params.subject

            //check if such param exist
            const dbResCheckExist = await pool.query(queryCheckExist,[exam_set_id,subject]);
        
            if(!dbResCheckExist.rows[0]){
                return res.status(400).json({
                    message:`Requested Question Data Not Found`
                })
            }

            const queryCallQuestionData = `
                SELECT question_id, question_text, f.path, multi_choice,answer_options
                FROM questions_${subject} q_s
                LEFT JOIN figures f ON
                q_s.figure_id = f.figure_id
                WHERE examination_id = $1
                ORDER BY question_id asc;
            `

            //call from questions table
            const dbResCallQuestions = await pool.query(queryCallQuestionData,[exam_set_id]);
            const questionData = dbResCallQuestions.rows

          
            res.status(201).json({
                message:`examset read! ${subject} | ${exam_set_id}`,
                questionData
            })
    
    
        }catch(error){
            console.error("error fetchQuestions :",error);
            res.status(500).json({
                message:`Internal Server Error`
            })
           
    
        }
    }
    
    export default fetchQuestions;

