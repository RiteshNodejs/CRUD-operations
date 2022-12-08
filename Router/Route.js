import userServices from "../Services/userServices";
import joiMiddleware from "../middleware/joiMiddleware";
import authValidaton from '../middleware/authMiddleware';


const Route=(app)=>{
    app.post('/register',joiMiddleware.Middleware,userServices.addUser);
    app.post('/login',joiMiddleware.Middleware,userServices.login);
    app.get('/profile',authValidaton.Validattion,userServices.myprofile);
    app.put('/updateProfile',[authValidaton.Validattion,joiMiddleware.Middleware],userServices.updateProfile);
    app.delete('/deleteUser',authValidaton.Validattion,userServices.delete); 
    app.post("/image",userServices.multer);
    app.post("/addquotes",[authValidaton.Validattion,joiMiddleware.Middleware],userServices.addquotes);
    app.get('/userquotes',authValidaton.Validattion,userServices.userQuots);
    app.get('/allQuotes',userServices.getallQuotes)
}
export default Route;