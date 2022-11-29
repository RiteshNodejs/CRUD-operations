import userServices from "../Services/userServices.js";
import joiMiddleware from "../middleware/joiMiddleware.js";
import authValidaton from '../middleware/authMiddleware.js';

const Route=(app)=>{
    app.post('/adduser',joiMiddleware,userServices.adduser);
    app.post('/login',joiMiddleware,userServices.login);
    app.get('/profile',[authValidaton,joiMiddleware],userServices.myprofile)
}

export default Route;