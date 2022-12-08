import mongoose from "mongoose";
import { Schema } from "mongoose";
import User from "./user";
const quotesSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    userId:{
      type:Schema.Types.ObjectId,
      ref: 'dbUser'
    }    
  }, { timestamps: true });

  let Quotes = mongoose.model("quots",quotesSchema);
  export default Quotes