import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import MESSAGES from "../utils/helpers/message_helper";
import upload from "../utils/helpers/multer_helper";
import Quotes from "../models/quotes";
import Helper from "../utils/Helpers";

class UserServices {
    async addUser(req, res) {
        try {
            const extUser = await User.findOne({ email: req.body.email });
            if (extUser) {
                let resPayload = {
                    message: MESSAGES.EMAIL_EXIST
                };
                return Helper.error(res, resPayload)
            }

            let myUser = new User(req.body);
            myUser.save().then((value) => {
                let resPayload = {
                    message: MESSAGES.REGISTER_SUCCESS,
                    payload: value.details
                };
                return Helper.success(res, resPayload)
            })
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return Helper.error(res, resPayload, 500)
        }
    }
    async login(req, res) {
        try {
            const extUser = await User.findOne({ email: req.body.email });
            if (!extUser) {
                let resPayload = {
                    message: MESSAGES.LOGIN_ERROR,
                    payload: {}
                };
                return Helper.error(res, resPayload)
            }
            if (extUser.deleted == true) {
                let resPayload = {
                    message: MESSAGES.USER_NOT_FOUND,
                    payload: {},
                };
                return Helper.success(res, resPayload)
            }
            const validPassword = await bcrypt.compare(req.body.password, extUser.password);
            if (!validPassword) {
                let resPayload = {
                    message: MESSAGES.LOGIN_ERROR,
                    payload: {}
                };
                return Helper.error(res, resPayload)
            };
            const token = jwt.sign({ _id: extUser._id }, process.env.JWT_SECRET, { expiresIn: "6000s" })
            let resPayload = {
                message: MESSAGES.LOGIN_SUCCESS,
                payload: { token: token }
            };
            return Helper.success(res, resPayload)
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return Helper.error(res, resPayload, 500)
        }
    }
    async getProfile(req, res) {
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
            const finalUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address: userAddress
            }
            let resPayload = {
                message: MESSAGES.PROFILE,
                payload: finalUser
            };
            Helper.success(res, resPayload)
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return Helper.error(res, resPayload, 500)
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
                return Helper.error(res, resPayload)
            }
            const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select("firstName lastName email");
    
            let resPayload = {
                message: MESSAGES.UPDATED_SUCCESS,
                payload: updatedUser
            };
            return Helper.success(res, resPayload)
        }
        catch {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return Helper.error(res, resPayload, 500)
        }
    }
    async delete(req, res) {
        try {
            const extUser = await User.findOne({ _id: req.user._id });
            if (extUser.deleted == false) {
                const idUser = req.user._id;
                await User.findByIdAndUpdate(idUser, { deleted: true })
                let resPayload = {
                    message: MESSAGES.DELETE_SUCCESS,
                };
                return Helper.success(res, resPayload)
            }
            return res.send(MESSAGES.NO_RECORDS)

        } catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return Helper.error(res, resPayload, 500)
        }
    }
    multer(req, res) {
        try{
         upload(req, res, (err) => {
                if (err) {
                    let resPayload = {
                        message: MESSAGES.FILE_NOT_UPLOADED,
                        payload: {}
                    };
                    return Helper.error(res, resPayload) 
                    
                } else {
                        let resPayload = {
                            message: MESSAGES.FILE_UPLOADED,
                            payload: {}
                        };
                        return Helper.success(res, resPayload)    
                }
            });
        }
        catch(err){
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return Helper.error(res, resPayload, 500)
        }
  

    };
    async addQuotes(req, res) {
        try {
            const idUser = req.user._id;
            let attribute = {
                title: req.body.title,
                userId: idUser
            }
            let myQuotes = new Quotes(attribute);

            myQuotes.save().then((value) => {
                let resPayload = {
                    message: MESSAGES.QUOTS_SUCCESS,
                    payload: value.title
                };
                return Helper.success(res, resPayload)
            }).catch((err) => {
                let resPayload = {
                    message: err,
                    payload: {}
                };
                return Helper.error(res, resPayload)
            })
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return Helper.error(res, resPayload, 500)
        }
    };
    async userQuots(req, res) {
        try {
            const idUser = req.user._id;
            // const user = await User.findById(idUser, { _id: 0, firstName: 1 })
            // const findQuote = await Quotes.find({ userId: idUser, },
            //     { _id: 0, title: 1, })

            // const finalUser = {
            //     by: user.firstName,
            //     qoutes: findQuote,
            // }
            const finalUser= await User.aggregate(
            [
                {
                    '$match': {
                      '_id': idUser
                    }
                  },
                {
                  '$lookup': {
                    'from': 'quots', 
                    'localField': '_id', 
                    'foreignField': 'userId', 
                    'as': 'quotes'
                  }
                },  {
                  '$project': {
                    '_id': 0, 
                    'by': '$firstName', 
                    'quotes': {
                      'title': 1
                    }
                  }
                }
              ])
            let resPayload = {
                message: MESSAGES.PROFILE,
                payload: finalUser
            };
            Helper.success(res, resPayload)
        } catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return Helper.error(res, resPayload, 500)
        }
    }
    async getAllQuotes(req, res) {
        const allQuotes = await User.aggregate(
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
                        '_id': 0,
                        'by': '$firstName',
                        'quotes': {
                            'title': 1
                        }
                    }
                }
            ]
        )
        let resPayload = {
            message: MESSAGES.GET_ALL_QUOTES,
            payload: allQuotes
        }
        Helper.success(res, resPayload)
    }
}
export default new UserServices;