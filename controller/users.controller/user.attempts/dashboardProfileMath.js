// This code is to calculate the avergae marks per subject
// The first thing is to create a request
//access user attemot db
//then calculate avg marks

import { pool } from "../../../database/connection.js";

 const dashboardProfileMath = async(req,res)=>{
    try{
        const username = req.params.username

        //validation
        if(!username){
            return res.status(400).json({
                message:`Invalid Request`
            });
        }

        // //get user id
        const queryGetID = `
        SELECT id
        FROM users
        where username = $1
        `
        const responseGetID = await pool.query(queryGetID,[username])

        const userId = responseGetID.rows[0].id

        // call user data, based on user Id
        const queryGetAttemptData = `
                SELECT 
                    subject, 
                      COUNT(DISTINCT attempt_id) AS number_of_attempts, 
                        ROUND(AVG(score)::numeric, 1) as average_score, 
                        ROUND(MIN(score)::numeric, 1) as min_score, 
                        ROUND(MAX(score)::numeric, 1) as max_score
                FROM 
                    user_exam_attempts
                WHERE 
                    user_id = $1 
                    AND username = $2
                GROUP BY 
                    subject;
            `
        const response = await pool.query(queryGetAttemptData,[userId,username]);
        console.log(response.rows);
        const dashboardData = response.rows

        function extractData(subjectName){
            return dashboardData.find((data)=>(data.subject === subjectName));
        }

        const bmData = extractData("bahasa_malaysia") || {};
        const biData = extractData("bahasa_inggeris") || {};
        const sejarahData = extractData("sejarah") || {};
        const paiData = extractData("pendidikan_islam") || {};
        const moralData = extractData("pendidikan_moral") || {};
        const matematikData = extractData("matematik") || {};

        //generating list for number of attempts
        let numberOfAttemptList = []
        const dataAttemptList = [bmData["number_of_attempts"],biData["number_of_attempts"],sejarahData["number_of_attempts"],paiData["number_of_attempts"],moralData["number_of_attempts"],matematikData["number_of_attempts"]]

        for(let i = 0 ; i<dataAttemptList.length; i++){
            if(dataAttemptList[i]=== undefined){
                numberOfAttemptList[i] =0
            }else{
            numberOfAttemptList[i] = dataAttemptList[i]
            }
        }

        //generating list for avg score
        let avgScoreList = [];
        const dataAvgScoreList = [bmData["average_score"],biData["average_score"],sejarahData["average_score"],paiData["average_score"],moralData["average_score"],matematikData["average_score"]]

        for(let i = 0 ; i<dataAvgScoreList.length; i++){
            if(dataAvgScoreList[i]=== undefined){
                avgScoreList[i] =0
            }else{
                avgScoreList[i] = dataAvgScoreList[i]
            }
        }

        res.status(200).json({
            message:`fetching dashboard for ${username}`,
            numberOfAttemptList,
            avgScoreList
                  
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"500 : SERVER ERROR @ getDashboard Data"
        })
    }

}

export default dashboardProfileMath