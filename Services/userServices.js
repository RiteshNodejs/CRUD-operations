import _user from "../Models/user";
import ResponseHelper from "../helpers/responseHelper";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import MESSAGES from "../helpers/messageHelper";


class userServices {
    async adduser(req, res) {
        try {
            const ExtUser = await _user.findOne({ email: req.body.email });
            if (ExtUser) {
                let resPayload = {
                    message: MESSAGES.EMAIL_EXIST
                };
                return ResponseHelper.error(res, resPayload)
            }
            let myUser = new _user(req.body);
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
            return ResponseHelper.error(res, resPayload)
        }
    }
    async login(req, res) {
        try {
            const ExtUsers = await _user.findOne({ email: req.body.email });
            if (!ExtUsers) {
                let resPayload = {
                    message: MESSAGES.LOGIN_ERROR,
                    payload: {}
                };
                return ResponseHelper.error(res, resPayload)
            } 
            const ExtUser = await _user.findOne({ email: req.body.email });
            if (ExtUser.deleted == true) {
                let resPayload = {
                    message: MESSAGES.USER_NOT_FOUND,
                    payload: {},
                };
                return ResponseHelper.success(res, resPayload)
            }
            const validPassword = await bcrypt.compare(req.body.password, ExtUsers.password);
            if (!validPassword) {
                let resPayload = {
                    message: MESSAGES.LOGIN_ERROR,
                    payload: {}
                };
                return ResponseHelper.error(res, resPayload)
            };
            const token = jwt.sign({ _id: ExtUsers._id }, 'mytoken')
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
            return ResponseHelper.error(res, resPayload)
        }
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
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload)
        }
    }
    async updateProfile(req, res) {
        try {
            const ExtUser = await _user.findOne({ email: req.body.email });
            if (ExtUser) {
                let resPayload = {
                    message: MESSAGES.EMAIL_EXIST

                };
                return ResponseHelper.error(res, resPayload)
            }

            const idUser = req.user._id;
            _user.findByIdAndUpdate(idUser, req.body, { new: true }).select("firstName lastName email")
                .then((value) => {
                    let resPayload = {
                        message: MESSAGES.UPDATED_SUCCESS,
                        payload: value
                    };
                    return ResponseHelper.success(res, resPayload)
                })
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SERVER_ERROR,
                payload: {}
            };
            return ResponseHelper.error(res, resPayload)
        }
    }
    async delete(req, res) {
        try {
            const ExtUser = await _user.findOne({ _id: req.user._id });
            if (ExtUser.deleted == false) {
                const idUser = req.user._id;
                await _user.findByIdAndUpdate(idUser, { deleted: true }) 
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
            return ResponseHelper.error(res, resPayload)
        }
    };
}
export default new userServices;