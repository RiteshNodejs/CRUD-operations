import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
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
  }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(12)
    const passwordhash = await bcrypt.hash(this.password, salt);
    this.password = passwordhash
    next();
  }
  catch {
    next(error)

  }
})
 userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      const passwordhash = await bcrypt.hash(this._update.password, 10);
      this._update.password = passwordhash;
    }
     next();
  }
  catch {
   return  next(error)

  }
});



let _user = mongoose.model("_user", userSchema)
export default _user
