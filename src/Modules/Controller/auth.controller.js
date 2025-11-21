import * as dbService from "../../Database/dbService.js";
import { UserModel } from "../../Database/Models/userModel.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
import { compareHashing, generateHashing } from "../../Utils/hash.utils.js";
import { generateToken } from "../../Utils/token.utils.js";
import { TokenModel } from "../../Database/Models/tokenModel.js";
import { eventEmitter } from "../../Utils/SendEmail/email.event.utils.js";
import { customAlphabet } from "nanoid";
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

  //Generate CUSTOM OTP
  const otp = customAlphabet(process.env.OTP_ALPHABET, 6)();

  //OTP Expires Time
  const expiresTimeOTP = new Date(Date.now() + 30 * 60 * 1000);

  //Create New User
  const user = await dbService.create({
    model: UserModel,
    data: {
      name,
      email,
      password: hashedPassword,
      confirmEmailOTP: await generateHashing({ plaintext: otp }),
      expiresInOTP: expiresTimeOTP,
    },
  });

  //event to send Confirm Email

  eventEmitter.emit("confirmEmail", { to: email, otp, name });

  return successResponse({
    res,
    statusCode: 201,
    message: "User has been Created Successfully , Check Your email inbox",
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

  //Check Email user is Confirmed!
  if (!user.confirmEmail)
    return next(new Error("Confirm Your Email", { cause: 400 }));

  const expiresIn = +process.env.TOKEN_EXPIRESIN;

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

export const confirmEmail = async (req, res, next) => {
  const { email, otp } = req.body;

  //Check if user not found or confirmed
  const user = await dbService.findOne({
    model: UserModel,
    filter: {
      email,
      confirmEmail: false,
      confirmEmailOTP: { $exists: true },
    },
  });
  if (!user)
    return next(
      new Error("User not found or already Confirmed", { cause: 404 })
    );

  //Compare OTP Hashing
  if (
    !(await compareHashing({ plaintext: otp, hashValue: user.confirmEmailOTP }))
  )
    return next(new Error("In-valid OTP", { cause: 400 }));

  //Check if OTP Expired
  if (user.expiresInOTP < Date.now())
    return next(new Error("OTP Expired", { cause: 400 }));

  //Update ConfirmEmail status in Database
  await dbService.findOneAndUpdate({
    model: UserModel,
    filter: { email },
    data: {
      $set: { confirmEmail: true },
      $unset: { confirmEmailOTP: true, expiresInOTP: true },
      $inc: { __v: 1 },
    },
  });
  return successResponse({
    res,
    statusCode: 200,
    message: "Email has been Confirmed Successfully",
  });
};
