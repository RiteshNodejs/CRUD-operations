import _user from "../Models/user.js";
import ResponseHelper from "../helpers/responseHelper.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



class userServices {
    adduser(req, res) {
        let myUser = new _user(req.body);
        myUser.save().then((value) => {
            
            let resPayload = {
                message: 'successfully added data',
                payload: { user: value, token }
            };
            return ResponseHelper.success(res, resPayload)
        }).catch(err => {
            res.status(400).send("allready exist")
        })
    }
    async login(req, res) {
        const ExtUser = await _user.findOne({ email: req.body.email });
        if (!ExtUser) return res.status(400).send('not a valid mail');
        const validPassword = await bcrypt.compare(req.body.password, ExtUser.password);

        if (!validPassword) return res.status(400).send("incorrect password");
        const token = jwt.sign({_id:ExtUser._id},'mytoken')
        return res.status(200).send({you:ExtUser,Token:token});
    }
    async myprofile(req, res) {
        try{
            const idUser=req.user._id;
            const user= await _user.findById(idUser)
            let resPayload = {
            message: 'profile information',
            payload: user
            };
            ResponseHelper.success(res, resPayload)
        }
       catch(err){
        let resPayload = {
            message: err.message,
            payload: {}
        };
        return ResponseHelper.error(res, resPayload)
       }
    }
}
export default new userServices;