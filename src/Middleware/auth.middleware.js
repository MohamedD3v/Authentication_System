import { verifyToken } from "../Utils/token.utils.js";
import * as dbService from "../Database/dbService.js";
import { TokenModel } from "../Database/Models/tokenModel.js";
import { UserModel } from "../Database/Models/userModel.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return next(new Error("Token Required", { cause: 400 }));

    const [bearer, token] = authorization?.split(" ") || [];

    if (!bearer && !token)
      return next(new Error("Missing token Type!!", { cause: 400 }));
    if (bearer !== "Bearer")
      return next(new Error("Missing token Type!!", { cause: 400 }));
    const decoded = await verifyToken({ token });
    if (!decoded?.id)
      return next(new Error("In-valid Token or expired", { cause: 400 }));

    const stored_token = await dbService.findOne({
      model: TokenModel,
      filter: { token },
    });
    if (!stored_token)
      return next(new Error("In-valid Token or expired", { cause: 404 }));

    const user = await dbService.findById({ model: UserModel, id: decoded.id });
    if (!user) return next(new Error("User Not Found", { cause: 404 }));

    req.user = user;
    return next();
  } catch (error) {
    if (error.message === "jwt expired")
      return next(new Error("Token expired", { cause: 401 }));
  }
  return next(new Error("In-valid Token", { cause: 500 }));
};
