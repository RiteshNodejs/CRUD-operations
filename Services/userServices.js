import User from "../Models/user";
import ResponseHelper from "../helpers/responseHelper";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import MESSAGES from "../helpers/messageHelper";
import upload from "../helpers/multerHelper";
import Quotes from "../Models/quotes";

class userServices {
    async addUser(req, res) {
        try {
            const ExtUser = await User.findOne({ email: req.body.email });
            if (ExtUser) {
                let resPayload = {
                    message: MESSAGES.EMAIL_EXIST
                };
                return ResponseHelper.error(res, resPayload)
            }

            let myUser = new User(req.body);
            // let myaddrsss= new Address(req.body);
            myUser.save().then((value) => {
                let resPayload = {
                    message: MESSAGES.REGISTER_SUCCESS,
                    payload: value.details
                };
                return ResponseHelper.success(res, resPayload)
            })
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload, 500)
        }
    }
    async login(req, res) {
        try {
            const ExtUser = await User.findOne({ email: req.body.email });
            if (!ExtUser) {
                let resPayload = {
                    message: MESSAGES.LOGIN_ERROR,
                    payload: {}
                };
                return ResponseHelper.error(res, resPayload)
            }
            if (ExtUser.deleted == true) {
                let resPayload = {
                    message: MESSAGES.USER_NOT_FOUND,
                    payload: {},
                };
                return ResponseHelper.success(res, resPayload)
            }
            const validPassword = await bcrypt.compare(req.body.password, ExtUser.password);
            if (!validPassword) {
                let resPayload = {
                    message: MESSAGES.LOGIN_ERROR,
                    payload: {}
                };
                return ResponseHelper.error(res, resPayload)
            };
            const token = jwt.sign({ _id: ExtUser._id }, process.env.JWT_SECRET, { expiresIn: "6000s" })
            let resPayload = {
                message: MESSAGES.LOGIN_SUCCESS,
                payload: { token: token }
            };
            return ResponseHelper.success(res, resPayload)
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload, 500)
        }
    }
    async myprofile(req, res) {
        try {
            const idUser = req.user._id;
            const user = await User.findById(idUser)
            const userAddress = {
                houseNo: user.address.houseNo,
                city: user.address.city,
                state: user.address.state,
                country: user.address.country,
                pincode: user.address.pincode
            }
            const Nuser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address: userAddress
            }
            let resPayload = {
                message: MESSAGES.PROFILE,
                payload: Nuser
            };
            ResponseHelper.success(res, resPayload)
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload, 500)
        }
    }
    async updateProfile(req, res) {
        try {
            const idUser = req.user._id;
            const extUser = await User.findOne({ email: req.body.email, _id: { $ne: idUser } }).lean();
            //$ne selects the documents where the value of the field is not equal to the specified value. This includes documents that do not contain the field.
            //   if(extUser.id!=idUser) ->also working 
            if (extUser) {
                let resPayload = {
                    message: MESSAGES.EMAIL_EXIST
                };
                return ResponseHelper.error(res, resPayload)
            }
            const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select("firstName lastName email");
            console.log("updated user", updatedUser)
            let resPayload = {
                message: MESSAGES.UPDATED_SUCCESS,
                payload: updatedUser
            };
            return ResponseHelper.success(res, resPayload)
        }
        catch {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload, 500)
        }
    }
    async delete(req, res) {
        try {
            const ExtUser = await User.findOne({ _id: req.user._id });
            if (ExtUser.deleted == false) {
                const idUser = req.user._id;
                await User.findByIdAndUpdate(idUser, { deleted: true })
                let resPayload = {
                    message: MESSAGES.DELETE_SUCCESS,
                };
                return ResponseHelper.success(res, resPayload)
            }
            return res.send(MESSAGES.NO_RECORDS)

        } catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload, 500)
        }
    }
    multer(req, res, err) {

        upload(req, res, (err) => {
            if (err) {
                res.status(500).send({
                    message: MESSAGES.FILE_NOT_UPLOADED,
                });
            } else {
                res.status(200).send({
                    message: MESSAGES.FILE_UPLOADED,
                });
            }
        });

    };
    async addquotes(req, res) {
        try {
            const idUser = req.user._id;
            

            let attribute = {
                title: req.body.title,
                by: req.body.by,
                userId: idUser
            }
            let myQuotes = new Quotes(attribute);

            myQuotes.save().then((value) => {
                let resPayload = {
                    message: MESSAGES.QUOTS_SUCCESS,
                    payload: value.title
                };
                return ResponseHelper.success(res, resPayload)
            }).catch((err) => {
                let resPayload = {
                    message: err,
                    payload: {}
                };
                return ResponseHelper.error(res, resPayload)
            })
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload, 500)
        }
    };
    async userQuots(req, res) {
        try{
            const idUser = req.user._id;
            const user = await User.findById(idUser,{_id:0,firstName:1})
            const findQuote =await Quotes.find({userId:idUser,},
                {_id:0,title:1,})
            // const findQuotes= findQuote.map((value)=>{
            //     return {title :value.title,by:value.by}    
            //   })
            
            const finalUser = {
              
                // firstName: user.firstName,
                // lastName: user.lastName,
                // email: user.email,
                by:user.firstName,
                qoutes:findQuote,
               
            }
            let resPayload = {
                message: MESSAGES.PROFILE,
                payload: finalUser
            };
            ResponseHelper.success(res, resPayload)
        } catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload, 500)
        }
    }
    async getallQuotes(req,res){
        const allQuotes= await User.aggregate(
            [
                {
                  '$lookup': {
                    'from': 'quots', 
                    'localField': '_id', 
                    'foreignField': 'userId', 
                    'as': 'quotes'
                  }
                }, {
                  '$project': {
                    '_id':0,
                    'firstName': 1, 
                    'quotes': {
                      'title': 1
                    }
                  }
                }
              ]    
     )
        let resPayload = {
            message: "Completed",
            payload: allQuotes
        }
        ResponseHelper.success(res, resPayload)
    }
}
export default new userServices;