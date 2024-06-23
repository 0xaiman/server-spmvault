import { pool } from "../../database/connection.js";
import admin from 'firebase-admin';

// Record path in Postgres DB
const query = `
    INSERT INTO firebase_figure(field_name, original_name, encoding, mimetype, file_name, path, size)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
`;




const uploadFileFirebase = async (req, res) => {
     try {
    console.log(req.file)
    const uploadedFile = req.file


    if(!req.file){

        return res.status(400).json({
            message:"File not detected"
        })
    }

    const bucket = admin.storage().bucket();
    const fileName = `${uploadedFile.originalname}-${Date.now()}`
    const filePath=  `biologi/2022/8/${uploadedFile.originalname}`;
    const file = bucket.file(filePath);

    // console.log(bucket);

    const blobStream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: Date.now().toString()
          }
        },
        gzip: true
      });

    // upload
    blobStream.on('error',(err)=>{
        console.error('uploadFIleFirebase.js ERROR',err);
        res.status(500).json({
            message:`uploadFIleFirebase.js ERROR ${err}`
        })
    });


    blobStream.on('finish',async()=>{
        const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2500'
        })
        console.log('Executing query to insert file data into database');


        await pool.query(query,[uploadedFile.fieldname,uploadedFile.originalname,uploadedFile.encoding,uploadedFile.mimetype, fileName,url,uploadedFile.size])


        
        res.status(200).json({
            message:`Upload ${uploadedFile.originalname} Succesfull`,
            url
        })

    })


    blobStream.end(uploadedFile.buffer);

    } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
        message: "500: ERROR",
        error
    })      
    }
};

export default uploadFileFirebase;
