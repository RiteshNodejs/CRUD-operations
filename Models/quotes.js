import mongoose from "mongoose";
import { Schema } from "mongoose";
import _user from "./user";
const quotesSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    by: {
      type: String,
      required: true,
    },
    userId:{type:Schema.Types.ObjectId,ref: '_user'}
    // userId:{
    //     type:String,
    //     require:true
    // }
    
  }, { timestamps: true });

  let Quotes = mongoose.model("quots",quotesSchema);
  export default Quotes