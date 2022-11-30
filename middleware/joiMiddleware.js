import validationHelper from "../helpers/validationhelper.js";
import ResponseHelper from "../helpers/responseHelper.js";
import MESSAGES from "../helpers/messageHelper.js";
class joiMiddleware{
  Middleware(req,res,next){
    let route =req.route.path;
    let method =req.method.toLowerCase();
       
    let schema = validationHelper.Validate(route,method);
    const{error}=schema.validate(req.body,{abortEarly:false});
    if(error){    
      let errors = error.details.map((curr)=>{
        let o ={};
        Object.assign(o,{message:curr.message.replace(/[\,"]/g,' '),path:curr.path.toString()});
        return o;
      })
        let payload={
            message:MESSAGES.VALIDATION_ERROR,
            payload:errors
        }
       return ResponseHelper.error(res,payload);
    }
    next();   
  }
}

export default new joiMiddleware;