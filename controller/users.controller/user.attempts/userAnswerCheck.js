import { pool } from "../../../database/connection.js";

// TODO: DIDNt finished, continue later on
// this one is for fetching answerList
//theplan is to compare with user answer
//then generate marks

const query2 = `
    SELECT answer_list, subject, title
    FROM exam_sets
    WHERE examination_id = $1
`
const query1 = `
    SELECT username, id, title
    FROM exam_sets
    WHERE examination_id = $1
`
 const submitAttemptResult = async(req,res)=>{
    try{
        const username = req.body.username
        const time_taken = req.body.time
        const userAnswer = req.body.userAnswer
        const subject = req.body.subject
        const {examination_id} =  req.params

        //validation
        if(!username|!time_taken|!userAnswer|!subject){
            return res.status(400).json({
                message:`Invalid Request`
            });
        }

        //get user id
        const queryGetID = `
        SELECT id
        FROM users
        where username = $1
        `
        const responseGetID = await pool.query(queryGetID,[username])

        const userId = responseGetID.rows[0].id
        console.log(userId)

        //get answer List
        const dbRes = await pool.query(query2,[examination_id])
        const answerScheme = dbRes.rows[0].answer_list

        //calculating user answer correct or not
        //compare with user answer
        let correct = 0;
        for (let i=0;i<answerScheme.length;i++){
            if(userAnswer[i]===answerScheme[i]){
                correct+=1
            }
        }

        let score = (correct/answerScheme.length)*100;
        score = Number(score.toFixed(1));

        //store the user_id, exam_id, time_taken, score, into userAttempt Table
        const queryStoreAttempt = `
            INSERT INTO user_exam_attempts (user_id,username,subject,examination_id, time_taken, score)
            VALUES ($1,$2,$3,$4,$5,$6)
        `
        await pool.query(queryStoreAttempt,[userId,username,subject,examination_id,time_taken,score])     

        res.status(200).json({
            message:`Attempt for this question has been stored`,
            time_taken,
            correct,
            score
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"500 : SERVER ERROR @ submitAttemptResult"
        })
    }

}

export default submitAttemptResult