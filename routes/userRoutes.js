import express from "express";
import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/userController.js";

const userRouter = express.Router();

// http://locqalhost:8080/api/v1/users/register
userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/logout", logoutController);

export default userRouter;
