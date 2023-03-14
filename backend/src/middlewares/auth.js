import Jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from "../models/User.js";


//Gauti vartotoja is cookies jei autheticated
export const SetAuthUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next();
  }

  const decoded = Jwt.verify(token,String(process.env.JWT_SECRET)||"SECRET_XXX");
  if (!decoded) {
    return next();
  }
  const user = await User.findById(decoded?.id)

  res.locals.user = user;

  next();
  // 9lhdlB
});
// middleware to protect a route, if autheticated then forward the request otherwise give error
export const authMiddleware = catchAsyncError(async (_, res, next) => {
  const { user } = res.locals;
  if (!user) {
    return next(new errorHandler("Please login again", 401));
  }

  return next();
});

