import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Name must be a most 3 Charcters long"],
      maxLength: [20, "Name must be a least 3 Charcters long"],
      required: true,
      trim: true,
    },
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
    password: {
      type: String,
      required: true,
      minlength: [6],
      trim: true,
      select: false,
    },
    confirmEmail: { type: Boolean, default: false },
    confirmEmailOTP: String,
    expiresInOTP: Date,
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
