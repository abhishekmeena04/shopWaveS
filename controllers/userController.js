import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // all fields are required to fill
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    // checking your email already exist or not
    const isExist = await userModal.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Email already exists" });
    }

    // encrypting user password
    const hashedPassword = await encryptPassword(password);

    // creating new user
    const newUser = await userModal.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({
      success: true,
      message: "User registration successfully",
      newUser,
    });
  } catch (error) {
    console.log(`Register Controller Error ${error}`);
    return res
      .status(400)
      .send({ success: false, message: "error in registerController", error });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // all fields are required to fill
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    // check user email is present in database or not
    const user = await userModal.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Email not registered" });
    }

    // matching password
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Incorrect Password" });
    }
    // generating token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });

    // removed password field to send user data from backend to frontend
    user.password = undefined;

    // return succes response
    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(200)
      .send({ success: true, message: "Login Successfull", user, token });
  } catch (error) {
    console.log(`Register Controller Error ${error}`);
    return res
      .status(400)
      .send({ success: false, message: "error in registerController", error });
  }
};

const logoutController = async (req, res) => {
  return res
    .cookie("token", "", {
      httpOnly: true,
      // secure: true,
      expires: new Date(0),
    }) // to remove cookies from browser cookies
    .status(200)
    .send({ success: true, message: "Logout Successfull" });
};

export { registerController, loginController, logoutController };
