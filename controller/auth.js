import { pool } from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



async function createToken(req,res){
    try{

        const email = req.body.email
        const password = req.body.password

        
        // input validation: check if 
        if(!password||!email){
            return res.status(401).json({
                ok:false,

                message:"email and password is required"
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

        // check if user exist

        const queryCheckUserExist = `SELECT * FROM users WHERE email = $1`
        const dbRes = await pool.query(queryCheckUserExist,[email])
        const userData = dbRes.rows[0]

        if(!userData){
            return res.status(401).json({
                ok:false,
                message:"User Not Found"
            });
        }
        console.log(userData)
        const id = userData.id;        
        const username = userData.username  
        const lastLogin = userData.last_login      
        const isValidPassword = bcrypt.compareSync(password,userData.password_hash);
        
        if(!isValidPassword){
            return res.status(401).json({
                ok:false,
                message:"Invalid Password"
            });

        }

        const data ={
            email,
            username
        }
        const secretkey = "secretkey";

        const token = jwt.sign(data,secretkey)

        // Update last_login field
        const updateLastLoginQuery = `UPDATE users SET last_login = NOW() WHERE email = $1`;
        await pool.query(updateLastLoginQuery, [email]);

        res.status(200).json({
            ok:true,
            message:"Login Success",
            id,
            lastLogin,
            email,
            username,
            token
        });

    }catch(error){
        console.error("error createToken :",error);
        res.status(500).json({
            message:`Internal Server Error`
        })
       

    }
}

export default createToken;