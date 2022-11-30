import joi from "joi";
class validationHelper {
    Validate(route, method) {
        console.log(route)
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
                    '/login': userSchemaLogin
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
    firstName: joi.string().min(1).max(20).required(),
    lastName: joi.string().min(1).max(20).required(),
    email: joi.string().email().min(2).max(20).required(),
    password: joi.string().min(5).max(15).required(),


});
const updateuserSchema = joi.object({
    firstName: joi.string().min(1).max(20).required(),
    lastName: joi.string().min(1).max(20).required(),
    email: joi.string().email().min(1).max(20).required(),
    password: joi.string().min(5).max(15).required(),
    

});
const userSchemaLogin = joi.object({
    email: joi.string().email().min(5).max(50).required(),
    password: joi.string().min(5).max(25)
});