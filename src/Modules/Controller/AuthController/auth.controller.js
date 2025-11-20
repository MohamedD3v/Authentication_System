import * as dbService from "../../../Database/dbService.js";
import { UserModel } from "../../../Database/Models/userModel.js";
import { successResponse } from "../../../Utils/successResponse.utils.js";
import { generateHashing } from "../../../Utils/hash.utils.js";
export const signup = async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  //Check if User already Exists!
  const checkUser = await dbService.findOne({
    model: UserModel,
    filter: { email },
  });
  if (checkUser) return next(new Error("Email already Exists", { cause: 409 }));

  //Check Password Matched!
  if (password !== passwordConfirm)
    return next(new Error("Password not matched", { cause: 400 }));

  
  //hash Password for More ==> Secure
  const hashedPassword = await generateHashing({ plaintext: password });


  //Create New User
  const user = await dbService.create({
    model: UserModel,
    data: { name, email, password: hashedPassword },
  });

  return successResponse({
    res,
    statusCode: 201,
    message: "User has been Created Successfully",
    data: { user: user },
  });
};
