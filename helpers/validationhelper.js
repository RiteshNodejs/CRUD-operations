import joi from "joi";
class validationHelper {
    Validate(route, method) {
        let obj = {}
        switch (method) {
            case 'get':
                obj = {
                    '/user/:id': userSchema,
                    '/getalluser': userSchema,
                    '/profile': userSchemaLogin
                }
                return obj[route];
                break;
            case 'post':
                obj = {
                    '/register': userSchema,
                    '/login': userSchemaLogin,
                    '/addquotes':userQuotes
                }
                return obj[route]
                break;
            case 'put':
                obj = {
                    '/user/:id': updateuserSchema,
                    '/updateProfile':updateuserSchema
                }
                return obj[route]
                break;
               
        }

    }
}
export default new validationHelper;
const userSchema = joi.object({
    firstName: joi.string().min(1).max(20).trim(true).required(),
    lastName: joi.string().min(1).max(20).trim(true).required(),
    email: joi.string().email().min(2).max(50).trim(true).required(),
    address:joi.object({
        houseNo:joi.string().min(2).max(6).optional(),
        city:joi.string().min(2).max(10).optional(),
        state:joi.string().min(2).max(15).optional(),
        pincode:joi.string().min(2).max(6).optional(),
        country:joi.string().min(2).max(20).optional()
    }),
    password: joi.string().min(5).max(25).trim(true).required(),
});
const updateuserSchema = joi.object({
    firstName: joi.string().min(1).max(20).optional(),
    lastName: joi.string().min(1).max(20).optional(),
    email: joi.string().email().min(1).max(50).optional(),
    address:joi.object({
        houseNo:joi.string().min(2).max(6).optional(),
        city:joi.string().min(2).max(10).optional(),
        state:joi.string().min(2).max(15).optional(),
        pincode:joi.string().min(2).max(6).optional(),
        country:joi.string().min(2).max(20).optional()
    }),
    password: joi.string().min(5).max(25).optional(),
});
const userSchemaLogin = joi.object({
    email: joi.string().email().min(5).max(50).trim(true).required(),
    password: joi.string().min(5).max(25).trim(true).required()
});
const userQuotes=joi.object({
    title:joi.string().trim().min(2).max(100).required()
  
})