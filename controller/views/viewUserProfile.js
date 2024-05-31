import { pool } from "../../database/connection.js";

const query = `
SELECT * FROM users
WHERE username = $1

`

async function viewUserProfile(req,res){
    try{
        const username = req.params.username

        console.log(username);
        if (!username) {
            return res.status(400).json({
              message: "Username parameter is required",
            });
          }

        const dbRes = await pool.query(query,[username]);
        
        if(dbRes.rows.length===0){
            return res.status(400).json({
                message: "User does not exist",
              });
        }
        const data = dbRes.rows[0]

        res.status(200).json({
            message:"read ok",
            data

        })


    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
}

export default viewUserProfile;