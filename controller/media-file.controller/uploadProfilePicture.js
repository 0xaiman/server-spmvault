import  fs from "fs";
import path  from "path";
import { pool } from "../../database/connection.js"
  

 const uploadProfilePicture= async(req,res)=>{

    try{

        const file = req.file
        const username = req.body.username

        if (!file) {
            return res.status(400).json({
              message: 'No file uploaded'
            });
          }

        // 1 - Check if theres already Profile pic uploaded
        const queryCheckExistingProfilePic = `
                SELECT username, file_name, path
                FROM profile_picture
                WHERE username = $1;
            `

        const checkExistingProfileImg = await pool.query(queryCheckExistingProfilePic,[username]);

        // 2 -  if profile pic has uploaded before, delete the existing one

        if(checkExistingProfileImg.rows.length>0 ){
            const existingFilePath = checkExistingProfileImg.rows[0].path;
            fs.unlink(existingFilePath, (err)=>{
                if(err){
                    console.log("Error Deleting Images :",err);
                    return res.status(500).json({
                        message:"Internal Server Error : Error Deleting Profile Images",
                        error:err
                    });
                }
            });
            const queryDeleteExisting = `
            DELETE FROM profile_picture
            WHERE username = $1;
            `
            await pool.query(queryDeleteExisting,[username])
        }


        // 3 - upload from user input
        const queryUploadImg = `
            INSERT into profile_picture(username,field_name,original_name,encoding,mimetype,destination,file_name,path,size)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            ;
        ` 

        await pool.query(queryUploadImg,[username,file.fieldname,file.originalname,file.encoding,file.mimetype,file.destination,file.filename,file.path,file.size])

        const profilePicturePath = `${file.destination}/${file.filename}`
       
        res.status(201).json({
            message:"File Upload Success",
            profilePicturePath,

            file
        })

    
    }catch(error){
        console.log("ERROR uploadProfilePicture : ", error);
        res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
}

export default uploadProfilePicture