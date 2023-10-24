import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const isAuth = async (req,res,next)=>{
    let token;
    
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req?.headers?.authorization?.split(" ")[1];
        
        try{    
            const tokenVerify = jwt.verify(token,"thisismysecreatekey")

            const user = await User.findById(tokenVerify?._id)

            req.user = user;

            next();

        }catch(err){
            res.status(422).send({status:false,message:"Not authorized token, token is expired, Please login again"})
        }
    }else{
        return res.status(422).json({status:false,message:"There is not token attached to header"})
    }
}

