import pkg from 'pg';
import createUserTable from '../model/users.js';
import createExamSetTable from '../model/examSets.js';
import createQuestionTable from '../model/questions.js';
import createFigureTable from '../model/figure.js';
import createAnswerTable from '../model/answer.js';
import createUserAttemptTable from '../model/userAttempts.js';
import createUserResponseTable from '../model/userResponse.js';

const { Pool } = pkg;


export const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database:'spmvaultdb',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function dbInit(){
    try{
        const dbRes = await pool.query("SELECT current_database();");
        const dbNow = await pool.query("SELECT NOW();");
        console.log(`CONNECTION SUCCESS:${dbRes.rows[0].current_database} (${dbNow.rows[0].now})`);
        createUserTable();
        createExamSetTable();
        createFigureTable();
        createQuestionTable();
        createAnswerTable();
        createUserAttemptTable();
        createUserResponseTable();

    }catch(error){
        console.log(`Database Connection Failed`);
        console.log("Error",error);
    }

}

export default dbInit;