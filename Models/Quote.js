import mongoose from "mongoose";
import { Schema } from "mongoose";

const quoteSchema= new Schema({
    message:{
        type:String,
        required:true
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
   
},{timestamps:true})
var _quote = mongoose.model("quote",quoteSchema);
export default  _quote
