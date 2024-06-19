import { pool } from "../../database/connection.js"
const query = `
    INSERT into figures(field_name,original_name,encoding,mimetype,destination,file_name,path,size)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    ;
`


 const uploadFile= async(req,res)=>{

    try{

        const file = req.file


        await pool.query(query,[file.fieldname,file.originalname,file.encoding,file.mimetype,file.destination,file.filename,file.path,file.size])

        res.status(201).json({
            message:"File Upload Success",
            file
        })

    
    }catch(error){
        console.log("ERROR uploadFile : ", error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export default uploadFile