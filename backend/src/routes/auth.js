import { Router } from "express";
import {
  getUser, login,
  logout,
  registerUser
} from "../controllers/authController.js";
import {
  authMiddleware, SetAuthUser
} from "../middlewares/auth.js";

const authRouter = Router();
authRouter.post(
  "/register",
  SetAuthUser,
  registerUser
);
authRouter.post("/login", login);



authRouter.post("/logout", SetAuthUser, authMiddleware, logout);
authRouter.get("/getUser", SetAuthUser, authMiddleware, getUser);



export default authRouter;
