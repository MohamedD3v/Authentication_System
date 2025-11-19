import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password:{type:String , required:true , minlength:[6,]},
    passwordConfirm:{type:String , required:true}
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model("User" , userSchema)

