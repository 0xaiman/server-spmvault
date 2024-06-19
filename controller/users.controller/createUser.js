// This file handles USER REGISTRATION
import { pool } from "../../database/connection.js";
import bcrypt, { genSaltSync } from "bcrypt";

const query = `
    INSERT INTO users (username, password_hash, email)
    VALUES ($1,$2,$3);
`

async function registerUser(req,res){
    try{
        const username = req.body.username
        const password = req.body.password
        const email = req.body.email
       

        // input validation: check if 
        if(!username||!password||!email){
            return res.status(401).json({
                ok:false,
                message:"Please ensure username, password and email input has been filled"
            })
        }

        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        if(!isValidEmail){
            return res.status(401).json({
                ok:false,
                message:"Invalid Email"
            });
        }

        //  check if user already exist 
        const userExistsQuery = 'SELECT COUNT(*) FROM users WHERE username = $1 OR email = $2';

        const userExistsResult = await pool.query(userExistsQuery, [username, email]);
        const userCount = parseInt(userExistsResult.rows[0].count, 10);

        if (userCount > 0) {
            return res.status(409).json({
                ok:false,
                message: "Username or Email already in use"
            });
        }

        
        // password hashing 
        const saltRounds = 11;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password,salt);
    

        const dbRes = await pool.query(query, [username,hashedPassword,email]);
        // console.log("registerUser OK");




        res.status(201).json({
            ok:true,
            message:`User ${username} has been succesfully registered`
        })

    }catch(error){
        console.error("error registerUser :",error);
        res.status(500).json({
            message:`Internal Server Error`
        })
       

    }
}

export default registerUser;