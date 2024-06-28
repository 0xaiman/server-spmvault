import pkg from 'pg';
import createUserTable from '../model/users.js';
import createExamSetTable from '../model/examSets.js';
import createQuestionTable from '../model/questions.js';
import createFigureTable from '../model/figure.js';
import createUserAttemptTable from '../model/userAttempts.js';
import "dotenv/config"
import createFirebaseFigureTable from '../model/firebaseFigure.js';


const { Pool } = pkg;



export const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    // ssl: {
    //     rejectUnauthorized: false, // Allow self-signed certificates from Render PostgreSQL
    //   },
  
  });

async function dbInit(){
    try{
        const dbRes = await pool.query("SELECT current_database();");
        const dbNow = await pool.query("SELECT NOW();");
        console.log(`CONNECTION SUCCESS:${dbRes.rows[0].current_database} (${dbNow.rows[0].now})`);
        createUserTable();
        createExamSetTable();
        createFigureTable();
        createFirebaseFigureTable();
        createQuestionTable();
        createUserAttemptTable();

    }catch(error){
        console.log(`Database Connection Failed`);
        console.log("Error",error);
    }

}

export default dbInit;