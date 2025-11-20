import * as dbService from "../../Database/dbService.js";
import { UserModel } from "../../Database/Models/userModel.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
import { compareHashing, generateHashing } from "../../Utils/hash.utils.js";
import { generateToken } from "../../Utils/token.utils.js";
import { TokenModel } from "../../Database/Models/tokenModel.js";
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  //Check if user not found
  const user = await dbService.findOne({
    model: UserModel,
    filter: { email },
    select: "+password",
  });
  if (!user)
    return next(new Error("In-valid email or password", { cause: 400 }));

  //Check if Password Equal Passwordhashing
  const match = await compareHashing({
    plaintext: password,
    hashValue: user.password,
  });
  if (!match)
    return next(new Error("In-valid email or password", { cause: 400 }));

  const expiresIn = +process.env.TOKEN_EXPIRESIN

  //Generate Token
  const access_token = await generateToken({
    payload: { id: user._id, email: user.email },
    options: { expiresIn: expiresIn },
  });

      //Expiration token time in Database
  const token_expiresIn = new Date(Date.now() + expiresIn * 1000);

  //Store Token in Database
  const stored_token = await dbService.create({
    model: TokenModel,
    data: {
      token: access_token,
      userId: user._id,
      expiredAt: token_expiresIn,
    },
  });


  if (!stored_token)
    return next(new Error("Token In-valid or Expired", { cause: 400 }));

  return successResponse({
    res,
    statusCode: 200,
    message: "User has been LoggedIn Successfully",
    data: { token: access_token },
  });
};
