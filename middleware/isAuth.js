function isAuth(req,res,next){
    const bearerToken = req.headers.authorizations;

    if(!token){
        return res.status(400).json({
            message: "Unauthorized"
        });
    }

    next();

}

export default isAuth;