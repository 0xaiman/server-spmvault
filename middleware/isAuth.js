import jwt from "jsonwebtoken"

function isAuth(req,res,next){
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1]
    console.log(bearerToken.split(" ")[1])
    if(!token){
        return res.status(400).json({
            message: "Unauthorized"
        });
    }
    // check token validity
    const secretkey = 'secretkey';
  

    try{
        const decoded  = jwt.verify(token, secretkey);
        console.log(decoded.username)
        req.email = decoded.email;
        req.username = decoded.username;

    }catch(error){
        return res.status(400).json({
            message: "Invalid token",
            error
         });
    }

    next();

}

export default isAuth;