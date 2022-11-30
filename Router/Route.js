import userServices from "../Services/userServices";
import joiMiddleware from "../middleware/joiMiddleware";
import authValidaton from '../middleware/authMiddleware';

const Route=(app)=>{
    app.post('/register',joiMiddleware.Middleware,userServices.adduser);
    app.post('/login',joiMiddleware.Middleware,userServices.login);
    app.get('/profile',authValidaton.Validattion,userServices.myprofile);
    app.put('/updateProfile',[authValidaton.Validattion,joiMiddleware.Middleware],userServices.updateProfile);
    app.delete('/deleteUser',authValidaton.Validattion,userServices.delete); 
}
export default Route;