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

// # next checkpoint: draft1

// 1.⁠ ⁠Register

// - First name
// - Last name
// - Email
// - Phone - userID
// - Password
// - Google/Facebook
// - Accept terms and conditions
// - Register button
// - Email verification

// 1. Login
//     1. UserID [email, phone]
//     2. Password
//     3. Google/Facebook 
//     4. Forgot password
// 2. Forgot password page.
//     1. By email to get email verification link. 
// 3. Embedded Signup ( user gets a WA bussiness account)
// 4. Add single contacts / Bulk Add
//     1. Name
//     2. Email
//     3. Phone
//     4. Tags
//     5. Country Code
//     6. Source of contact 
//     7. Mark as Spam
// 5. Template message
// 6. ⁠Send first message to contacts
// (bulk message to contacts)
// 7. chat window
// 8. ⁠Receive and display message notifications (like message delivery status)
