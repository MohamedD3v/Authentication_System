import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token:{type:String , required:true},
    userId:{type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true},
    isValid:{type:Boolean , default:true},
    expiredAt:{type:Date , required:true}
},{timestamps:true})


export const TokenModel = mongoose.models.Token || mongoose.model("Token"  , tokenSchema)