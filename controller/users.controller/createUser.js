// This file handles USER REGISTRATION
import { pool } from "../../database/connection.js";
import bcrypt, { genSaltSync } from "bcrypt";

const query = `
    INSERT INTO users (username, password_hash, email,school_name, school_type,grade,age)
    VALUES ($1,$2,$3,$4,$5,$6,$7);
`

async function registerUser(req,res){
    try{
        const username = req.body.username
        const password = req.body.password
        const email = req.body.email
        const school = req.body.school
        const school_type = req.body.school_type
        const grade = req.body.grade
        const age = req.body.age

        // input validation: check if 
        if(!username||!password||!email||!school||!school_type||!grade||!age){
            return res.status(401).json({
                message:"Please ensure every info is filled in"
            })
        }

        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        if(!isValidEmail){
            return res.status(401).json({
                message:"Invalid Email"
            });
        }

        //  check if user already exist 
        const userExistsQuery = 'SELECT COUNT(*) FROM users WHERE username = $1 OR email = $2';

        const userExistsResult = await pool.query(userExistsQuery, [username, email]);
        const userCount = parseInt(userExistsResult.rows[0].count, 10);

        if (userCount > 0) {
            return res.status(409).json({
                message: "Username or Email already in use"
            });
        }

        
        // password hashing 
        const saltRounds = 11;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password,salt);
    

        const dbRes = await pool.query(query, [username,hashedPassword,email,school, school_type,grade,age]);
        console.log("registerUser OK");




        res.status(201).json({
            message:`User ${username} has been registered`
        })

    }catch(error){
        console.error("error registerUser :",error);
        res.status(500).json({
            message:`Internal Server Error`
        })
       

    }
}

export default registerUser;