import _user from "../Models/user.js";
import ResponseHelper from "../helpers/responseHelper.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import MESSAGES from "../helpers/messageHelper";


class userServices {
    async adduser(req, res) {
        const ExtUser = await _user.findOne({ email: req.body.email });
        if (ExtUser){ 
            let resPayload = {
                message: MESSAGES.EMAIL_EXIST
                
            };
            return ResponseHelper.error(res, resPayload)
           
        } 
        else{
            let myUser = new _user(req.body);
            myUser.save().then((value)=> {
                let resPayload = {
                    message: MESSAGES.REGISTER_SUCCESS,
                    payload:value.details
                };
                return ResponseHelper.success(res, resPayload)
            })
        }
                
    }
    async login(req, res) {
        const ExtUser = await _user.findOne({ email: req.body.email });
        if (!ExtUser) return res.status(400).send(MESSAGES.LOGIN_ERROR);
        const validPassword = await bcrypt.compare(req.body.password, ExtUser.password);
        if (!validPassword) return res.status(400).send(MESSAGES.LOGIN_ERROR);
        const token = jwt.sign({ _id: ExtUser._id }, process.env.JWT_SECRET)
        return res.status(200).send({ you: ExtUser, Token: token });
    }
    async myprofile(req, res) {
        try {
            const idUser = req.user._id;
            const user = await _user.findById(idUser).select("firstName lastName email")
            let resPayload = {
                message: MESSAGES.PROFILE,
                payload: user
            };
            ResponseHelper.success(res, resPayload)
        }
        catch (err) {
            let resPayload = {
                message: err.message,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload)
        }
    }
    async updateProfile(req, res) {
        
            const { firstName, lastName, email, password } = req.body;
            const salt = await bcrypt.genSalt(12)
            const passwordhash = await bcrypt.hash(password, salt);
            const Attributes = { firstName, lastName, email, password: passwordhash }

            const idUser = req.user._id;
             _user.findByIdAndUpdate(idUser, Attributes,{new:true}).select("firstName lastName email")
             .then((value)=> {
                let resPayload = {
                    message: MESSAGES.UPDATED_SUCCESS,
                    payload:value
                };
                return ResponseHelper.success(res, resPayload)
            }).catch(err => {
                res.status(400).send(MESSAGES.UPDATED_ERROR)
            })
                
      
        
    }
    // async delete(req,res){
        
    //     try {
    //         const idUser = req.user._id;
    //         console.log(idUser)
    //         await _user.findByIdAndUpdate(idUser,{ deleted: true });
    //         res.status(200).send('deleted');
    //       } catch (error) {
    //         res.status(500).send('error while delete')
    //       }
    //     };
}



export default new userServices;