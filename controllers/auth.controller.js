import bcrypt from "bcrypt";
import jsonschema from "jsonschema";
import jwt from "jsonwebtoken";
import { ExpressError } from "../expressError.js";
import User from "../models/user.model.js";
import loginSchema from "../schemas/login.schema.json" assert { type: "json" };
import signupSchema from "../schemas/signup.schema.json" assert { type: "json" };

export async function signup(req, res, next) {
  try {
    const { password, username } = req.body;

    const schemaResult = jsonschema.validate(req.body, signupSchema, {
      required: true,
    });

    if (schemaResult.valid) {
      const foundUser = await User.findOne({ username });

      if (!foundUser) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ ...req.body, password: hashedPassword });

        const savedUser = await newUser.save();
        const token = jwt.sign(
          { username: savedUser.username },
          process.env.JWT_SECRET
        );

        return res.json({ token });
      } else {
        return next(new ExpressError(`Username already exists`, 403));
      }
    } else {
      const errors = [];
      if (schemaResult.errors) {
        for (let err of schemaResult.errors) {
          errors.push(err);
        }
      }
      return next(new ExpressError(`Validation Error: ${errors}`, 403));
    }
  } catch (error) {
    console.log(error);
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const schemaResult = jsonschema.validate(req.body, loginSchema, {
      required: true,
    });

    if (schemaResult.valid) {
      const { username, password } = req.body;

      const foundUser = await User.findOne({ username });

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
        for (let err of schemaResult.errors) {
          errors.push(err);
        }
        return next(new ExpressError(`Validation Error: ${errors}`, 403));
      } else {
        return next(new ExpressError(`Validation Error`, 403));
      }
    }
  } catch (error) {
    console.log(error);
    return next(err);
  }
}
