import joi from "joi";
const validationHelper =(route,method)=>{
    let obj ={}
    switch(method){
        case 'get':
            obj={
                '/user/:id':userSchema,
                '/getalluser': userSchema,
                '/profile':userSchemaLogin
                
                
            }
            return obj[route];
            break;
            case 'post':
                obj={
                    '/adduser':userSchema,
                    '/login':userSchemaLogin

                }
                return obj[route]
                break;        
            case 'put':
                obj={
                    '/user/:id':updateuserSchema,
                }
                return obj[route]
                break;
    }
}
export default validationHelper;
const userSchema = joi.object({
    firstName:joi.string().min(5).max(10).required(),
    lastName:joi.string().min(5).max(10).required(),
    email:joi.string().email().min(5).max(20).required(),
    password:joi.string().min(5).max(15).required(),
    createdAt:joi.date().required(),
    updatedAt:joi.date().optional(),

 });
 const updateuserSchema =joi.object({
    firstName:joi.string().min(5).max(10).required(),
    lastName:joi.string().min(5).max(10).required(),
    email:joi.string().email().min(5).max(20).required(),
    password:joi.string().min(5).max(15).required(),
    updatedAt:joi.date().required()

 });
 const userSchemaLogin =joi.object({
    email:joi.string().email().min(5).max(20).required(),
    password:joi.string().min(5).max(15)
 });