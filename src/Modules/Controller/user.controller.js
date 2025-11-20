import { successResponse } from "../../Utils/successResponse.utils.js";
import * as dbService from "../../Database/dbService.js";
import { TokenModel } from "../../Database/Models/tokenModel.js";
export const profile = async (req, res, next) => {
  return successResponse({
    res,
    statusCode: 200,
    message: "Fetching User...",
  });
};

export const logout = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization?.split(" ");
  const stored_token = await dbService.findOneAndDelete({
    model: TokenModel,
    filter: { token },
  });
  if (!stored_token) return next(new Error("Token not found or revoked"));
  return successResponse({
    res,
    statusCode: 200,
    message: "Token has been Revoked",
    data: { stored_token },
  });
};
