import bcryptjs from "bcryptjs";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from "../models/User.js";
import { errorHandler } from "../utils/errorHandler.js";
import { removeToken, sendToken } from "../utils/jwtToken.js";

// Surinkti visus vartotojus
const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({ success: true, users });
});

// Atnaujinti vartotoja
const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  let user;
  if (password) {
    const hashed = bcryptjs.hashSync(password);
    user = await User.findByIdAndUpdate(
      id,
      { ...req.body, password: hashed },
      { new: true, runValidators: true }
    );
  } else {
    user = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });
  }
  if (!user) {
    return next(new errorHandler("Failed to Updated the User", 400));
  }
  return res.status(200).json({ success: true, user });
});
// Prisijungimas
const login = catchAsyncError(async (req, res, next) => {
  const { name, surName } = req.body;

  if (!name) return next(new errorHandler("Name cannot be empty", 400));
  if (!surName) return next(new errorHandler("Surname cannot be empty", 400));

  const user = await User.findOne({ name,surName })
  if (!user) return next(new errorHandler("User not found", 400));

  sendToken(user, 200, res);
});
// Registracija
const registerUser = catchAsyncError(async (req, res, next) => {
  
  const exist = await User.findOne({email:req.body.email})
  if(exist){
    return next(new errorHandler("Email already in use", 400));
  }
  const user = new User(req.body);
  await user.save();

  return res.status(200).json({ success: true, user });
});

// Atsijungti
const logout = catchAsyncError(async (_, res) => {
  res.locals.user = undefined;
  removeToken(res);
});

// Istrinti vartotoja
const removeUser = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);

  return res.status(200).json({ success: true });
});
const getUser = catchAsyncError(async (_, res) => {
  return res.status(200).json(res?.locals.user);
});

export {
  login,
  registerUser,
  logout,
  updateUser,
  getAllUsers,
  removeUser,
  getUser,
};

