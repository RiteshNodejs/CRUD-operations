import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import  {addressSchema} from "./address";
import { nanoid } from "nanoid";

const userSchema = new Schema({
  _id:{
    type:String,
    default:()=> nanoid()
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: false,
  },
  deleted: {
    type: Boolean,
    default: false
  },
  address: addressSchema,
  
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(12)
    const passwordhash = await bcrypt.hash(this.password, salt);
    this.password = passwordhash
    next();
  }
  catch {
   return next(error)

  }
})
 userSchema.pre('findOneAndUpdate', async function (next) {
  try {

    if (this.password) {
      
      const passwordhash = await bcrypt.hash(this.password, 10);
      this.password = passwordhash;
      console.log("ni chal raha ")
    }
     next();
  }
  catch(err) {
    console.log("err======",err)
   return next(err)

  }
});

const User = mongoose.model("dbUser", userSchema)
export default User
