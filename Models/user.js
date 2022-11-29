import mongoose from "mongoose";
import  {Schema}  from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:false,

    },
    createdAt:{
        type:String,
        required:false
    },
    updatedAt:{
        type:String,
        required:false
    }

   
})
userSchema.pre("save",async function(next){
  try{
    const salt=await bcrypt.genSalt(12)
    const passwordhash=await bcrypt.hash(this.password,salt);
    this.password=passwordhash
    next();
  }
  catch{
    next(error)

  }
})
let _user =mongoose.model("_user",userSchema)
export default _user;
