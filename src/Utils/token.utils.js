import jwt from "jsonwebtoken";

//Help to Generate Token
export const generateToken = async ({
  payload = {},
  signature = process.env.TOKEN_SIGNATURE,
  options = { expiresIn: +process.env.TOKEN_EXPIRESIN },
} = {}) => {
  return await jwt.sign(payload, signature, options);
};

//Help to Verify Token
export const verifyToken = async ({
  token = "",
  signature = process.env.TOKEN_SIGNATURE,
} = {}) => {
  return await jwt.verify(token, signature);
};
