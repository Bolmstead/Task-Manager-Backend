import bcrypt from "bcrypt";
import jsonschema from "jsonschema";
import jwt from "jsonwebtoken";
import { ExpressError } from "../expressError.js";
import User from "../models/user.model.js";
import loginSchema from "../schemas/login.schema.json" assert { type: "json" };
import signupSchema from "../schemas/signup.schema.json" assert { type: "json" };

/**
 * Signup and Login User
 */
export async function signup(req, res, next) {
  try {
    console.log("req.body", req.body);
    const { password, username } = req.body;
    console.log(
      "🚀 ~ file: auth.controller.js:16 ~ signup ~ password, username:",
      password,
      username
    );

    const schemaResult = jsonschema.validate(req.body, signupSchema, {
      required: true,
    });
    console.log(
      "🚀 ~ file: auth.controller.js:25 ~ signup ~ schemaResult:",
      schemaResult
    );

    if (schemaResult.valid) {
      let foundUser = await User.findOne({ username });
      console.log(
        "🚀 ~ file: auth.controller.js:23 ~ signup ~ foundUser:",
        foundUser
      );

      if (!foundUser) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ ...req.body, password: hashedPassword });
        console.log(
          "🚀 ~ file: auth.controller.js:24 ~ signup ~ newUser:",
          newUser
        );
        const savedUser = await newUser.save();
        const token = jwt.sign(
          { username: savedUser.username },
          process.env.JWT_SECRET
        );
        console.log(
          "🚀 ~ file: auth.controller.js:38 ~ signup ~ token:",
          token
        );

        return res.json({ token });
      } else {
        return next(new ExpressError(`Username already exists`, 403));
      }
    } else {
      const errors = [];
      if (schemaResult.errors) {
        for (let err of schemaResult.errors) {
          console.log("🚀 ~ file: auth.controller.js:48 ~ signup ~ err:", err);
          errors.push(err);
        }
      }
      return next(new ExpressError(`Validation Error: ${errors}`, 403));
    }
  } catch (error) {
    console.log("🚀 ~ file: auth.controller.js:67 ~ signup ~ error:", error);
    return next(new ExpressError(`Server Error`, 500));
  }
}

/**
 * Login User
 */
export async function login(req, res, next) {
  try {
    const schemaResult = jsonschema.validate(req.body, loginSchema, {
      required: true,
    });
    console.log(
      "🚀 ~ file: auth.controller.js:64 ~ login ~ schemaResult.valid:",
      schemaResult.valid
    );

    if (schemaResult.valid) {
      const { username, password } = req.body;
      console.log(
        "🚀 ~ file: auth.controller.js:68 ~ login ~ username, password:",
        username,
        password
      );

      let foundUser = await User.findOne({ username });
      console.log(
        "🚀 ~ file: auth.controller.js:71 ~ login ~ foundUser:",
        foundUser
      );

      if (foundUser) {
        // compare hashed password to a new hash from password
        const isPasswordValid = await bcrypt.compare(
          password,
          foundUser.password
        );
        console.log(
          "🚀 ~ file: auth.controller.js:89 ~ login ~ isPasswordValid:",
          isPasswordValid
        );

        if (isPasswordValid) {
          const token = jwt.sign(
            { username: foundUser.username },
            process.env.JWT_SECRET
          );
          return res.json({ token });
        } else {
          console.log("made it 98!");
          return next(new ExpressError(`Username or Password is Invalid`, 401));
        }
      } else {
        return next(new ExpressError(`Username or Password is Invalid`, 401));
      }
    } else {
      const errors = [];
      if (schemaResult.errors) {
        for (let err of schemaResult.errors) {
          errors.push(err);
        }
        return next(new ExpressError(`Validation Error: ${errors}`, 403));
      } else {
        return next(new ExpressError(`Validation Error`, 403));
      }
    }
  } catch (error) {
    console.log("🚀 ~ file: auth.controller.js:134 ~ login ~ error:", error);
    return next(new ExpressError(`Server Error`, 500));
  }
}
