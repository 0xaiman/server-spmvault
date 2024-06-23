// This file creates Table for users table if not exist
import { pool } from "../../database/connection.js";




async function insertQuestionIntoExamSet(req,res){
        try{
            const examination_id = req.body.examination_id;
            const question_text = req.body.question_text;
            const chapter = req.body.chapter;
            const form = req.body.form;
            const questions_subject = req.params.questions_subject

            const query = `
                INSERT INTO ${questions_subject} (examination_id, question_text, chapter,form)
                VALUES ($1,$2,$3,$4);
                `

            await pool.query(query,[examination_id,question_text,chapter,form]);
            console.log("insertQuestionIntoExamSet OK");
            res.status(201).json({
                message:`question inputted!`,
                question_text            
            })
    
    
        }catch(error){
            console.error("error insertQuestionIntoExamSet :",error);
            res.status(500).json({
                message:`500: examset creation fails!`
            })
           
    
        }
    }
    
    export default insertQuestionIntoExamSet;

