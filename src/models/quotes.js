import mongoose from "mongoose";
import { Schema } from "mongoose";
import { nanoid } from "nanoid";
const quotesSchema = new Schema({
  _id:{
    type:String,
    default:()=> nanoid()
  },
    title: {
      type: String,
      required: true
    },
    userId:{
      type:String,
      require:true
    }    
  }, { timestamps: true });

  let Quotes = mongoose.model("quots",quotesSchema);
  export default Quotes