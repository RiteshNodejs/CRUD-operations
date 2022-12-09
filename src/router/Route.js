import UserServices from "../services/user_services";
import JoiMiddleware from "../utils/middleware/joi_middleware";
import AuthValidaton from '../utils/middleware/auth_middleware';


const Route=(app)=>{
    app.post('/register',JoiMiddleware.Middleware,UserServices.addUser);
    app.post('/login',JoiMiddleware.Middleware,UserServices.login);
    app.get('/profile',AuthValidaton.Validattion,UserServices.getProfile);
    app.put('/updateProfile',[AuthValidaton.Validattion,JoiMiddleware.Middleware],UserServices.updateProfile);
    app.delete('/deleteUser',AuthValidaton.Validattion,UserServices.delete); 
    app.post("/image",UserServices.multer);
    app.post("/addquotes",[AuthValidaton.Validattion,JoiMiddleware.Middleware],UserServices.addQuotes);
    app.get('/userquotes',AuthValidaton.Validattion,UserServices.userQuots);
    app.get('/allQuotes',UserServices.getAllQuotes)
}
export default Route;