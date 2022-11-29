import validationHelper from "../helpers/validationhelper.js";
import ResponseHelper from "../helpers/responseHelper.js";
import  jwt  from "jsonwebtoken";


const authValidaton =(req,res,next)=>{
    const header =req.headers.authorization;
    const token = header.replace("Bearer ","")
    
    try{
        const decoded= jwt.verify(token, 'mytoken')

        req.user=decoded
    }
    catch(err){
        let payload={
            message:err.message,
            payload:{}
        }
       return ResponseHelper.error(res,payload,401);
    }
    next();   
}
export default authValidaton;