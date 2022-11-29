import validationHelper from "../helpers/validationhelper.js";
import ResponseHelper from "../helpers/responseHelper.js";

const joiMiddleware =(req,res,next)=>{
    let route =req.route.path;
    let method =req.method.toLowerCase();
       
    let schema = validationHelper(route,method);
    const{error}=schema.validate(req.body,{abortEarly:false});
    if(error){    
      let errors = error.details.map((curr)=>{
        let o ={};
        Object.assign(o,{message:curr.message.replace(/[\,"]/g,' '),path:curr.path.toString()});
        return o;
      })
        let payload={
            message:'validation error',
            payload:errors
        }
       return ResponseHelper.error(res,payload);
    }
    next();   
}
export default joiMiddleware;