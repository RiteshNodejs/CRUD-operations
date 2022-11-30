import userServices from "../Services/userServices.js";
import joiMiddleware from "../middleware/joiMiddleware.js";
import authValidaton from '../middleware/authMiddleware.js';

const Route=(app)=>{
    app.post('/register',joiMiddleware.Middleware,userServices.adduser);
    app.post('/login',joiMiddleware.Middleware,userServices.login);
    app.get('/profile',authValidaton.Validattion,userServices.myprofile);
    app.put('/updateProfile',authValidaton.Validattion,userServices.updateProfile);
    // app.delete('/deleteUser',authValidaton.Validattion,userServices.delete);
  
}

export default Route;