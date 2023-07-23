import bcrypt from "bcrypt";
import jsonschema from "jsonschema";
import jwt from "jsonwebtoken";
import { ExpressError } from "../expressError.js";
import User from "../models/user.model.js";
import loginSchema from "../schemas/login.schema.json" assert { type: "json" };
import registerSchema from "../schemas/register.schema.json" assert { type: "json" };

/**
 * Register and Login User
 */
export async function register(req, res, next) {
  try {
    console.log("req.body", req.body);
    const { password, username } = req.body;

    const schemaResult = jsonschema.validate(req.body, registerSchema, {
      required: true,
    });

    if (schemaResult.valid) {
      let foundUser = await User.findOne({ username });

      if (!foundUser) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ ...req.body, password: hashedPassword });
        console.log(
          "🚀 ~ file: auth.controller.js:24 ~ register ~ newUser:",
          newUser
        );

        const token = jwt.sign(
          { username: newUser.username },
          process.env.JWT_SECRET
        );

        return res.json({ token });
      } else {
        return next(new ExpressError(`Username already exists`, 403));
      }
    } else {
      const errors = [];
      if (schemaResult.errors) {
        for (let err of result.errors) {
          errors.push(err);
        }
      }
      return next(new ExpressError(`Validation Error: ${errors}`, 403));
    }
  } catch (error) {
    return next(error);
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

    if (schemaResult.valid) {
      const { username, password } = req.body;

      let foundUser = await User.findOne({ username });

      if (foundUser) {
        // compare hashed password to a new hash from password
        const isPasswordValid = await bcrypt.compare(
          password,
          foundUser.password
        );

        if (isPasswordValid) {
          const token = jwt.sign(
            { username: foundUser.username },
            process.env.JWT_SECRET
          );
          return res.json({ token });
        } else {
          return next(new ExpressError(`Username or Password is Invalid`, 401));
        }
      } else {
        return next(new ExpressError(`Username or Password is Invalid`, 401));
      }
    } else {
      const errors = [];
      if (schemaResult.errors) {
        for (let err of result.errors) {
          errors.push(err);
        }
        return next(new ExpressError(`Validation Error: ${errors}`, 403));
      } else {
        return next(new ExpressError(`Validation Error`, 403));
      }
    }
  } catch (error) {
    console.log("🚀 ~ file: auth.controller.js:134 ~ login ~ error:", error);
    return next(error);
  }
}
