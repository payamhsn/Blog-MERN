import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

//Create signin function for signin api route :

export const signin = async (req, res, next) => {
  //
  //Get email & password from request:

  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    //
    //Search in DB for user based on user email:

    const validUser = await User.findOne({ email });
    if (!validUser) {
      //REMINDER => Change error handler message in a way that nobody can know what is the reason of failure.

      return next(errorHandler(404, "User not found"));
    }
    //
    //Compare user password from req and DB via compareSync method:

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    //
    //Make Json web token with user id from DB,for make a cookie with that, so the browser remember user and logged in.
    //As i dont set time for storing cookie in browser,by default,cookie stored till user close the browser.

    const token = jwt.sign({ id: validUser._id }, process.env.JWTSECRET);

    //
    //Make new constants from validUser without password, because of not sending passwords from DB to browser,even hashed.

    const { password: pass, ...rest } = validUser._doc;

    //Send response to front:

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
