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
        // console.log(response.rows);
        // "getting subject name from response:
        // console.log("getting subject name from response:",response.rows[0]);
        // storing those subject in single array
        let arraySubject = []
        for(let i=0;i<response.rows.length;i++){
            arraySubject[i] = response.rows[i].subject
        }
        // console.log("arraySUbject", arraySubject)
        const dashboardData = response.rows

        function extractData(subjectName){
            return dashboardData.find((data)=>(data.subject === subjectName));
        }

        let numberOfAttemptList = []

        // store numberOfAttempts in single array to fit reactapexcharts format
        // loop for : If the data gathered from SQL equates to subject arrays, 
        // store the number of attaempts in numberOfAttempts array
        for(let i = 0; i<arraySubject.length;i++){
            if(dashboardData[i].subject === arraySubject[i]){
                numberOfAttemptList[i] = dashboardData[i].number_of_attempts
            }

        }

        //generating list for avg score
        let avgScoreList = [];

        // store avgScore in single array to fit reactapexcharts format
         // store the number of attaempts in numberOfAttempts array
         for(let i = 0; i<arraySubject.length;i++){
            if(dashboardData[i].subject === arraySubject[i]){
                avgScoreList[i] = dashboardData[i].average_score
            }

        }
     

        res.status(200).json({
            message:`fetching dashboard for ${username}`,
            arraySubject,
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