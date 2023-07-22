import bcrypt from "bcrypt";
import jsonschema from "jsonschema";
import User from "../models/user.model.js";
import authSchema from "../schemas/auth.schema.json" assert { type: "json" };

/**
 * Register and Login User
 */
export async function register(req, res, next) {
  try {
    console.log("req.body", req.body);
    const { password, username } = req.body;

    const schemaResult = jsonschema.validate(req.body, authSchema, {
      required: true,
    });
    console.log(
      "🚀 ~ file: task.controller.js:24 ~ createTask ~ schemaResult:",
      schemaResult
    );
    if (schemaResult.valid) {
      let foundUser = await User.findOne({ username });

      if (!foundUser) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ ...req.body, password: hashedPassword });
        console.log(
          "🚀 ~ file: auth.controller.js:24 ~ register ~ newUser:",
          newUser
        );
        await newUser.save();

        return res.json({
          status: "success",
          message: "User created",
        });
      } else {
        return res.json({
          status: "error",
          errors: "Username already taken",
        });
      }
    } else {
      const errors = [];
      if (schemaResult.errors) {
        for (let err of result.errors) {
          errors.push(err);
        }
      }
      return res.json({
        status: "error",
        errors: errors,
      });
    }
  } catch (error) {
    return res.json({ status: "error", error });
  }
}

/**
 * Login User
 */
export async function login(req, res, next) {
  try {
    const schemaResult = jsonschema.validate(req.body, authSchema, {
      required: true,
    });
    if (schemaResult.isValid) {
      const { username } = req.body;
      let foundUser = await User.findOne({ username });
      console.log(
        "🚀 ~ file: auth.controller.js:55 ~ login ~ foundUser:",
        foundUser
      );
      if (foundUser) {
        // compare hashed password to a new hash from password
        const isPasswordValid = await bcrypt.compare(
          password,
          foundUser.password
        );
        console.log(
          "🚀 ~ file: auth.controller.js:78 ~ login ~ isPasswordValid:",
          isPasswordValid
        );
        if (isPasswordValid) {
          const token = jwt.sign(
            { username: foundUser.username },
            process.env.JWT_SECRET
          );
          return res.json({ token });
        } else {
          return res.json({ error: "Password is invalid" });
        }
      } else {
        return res.json({ error: "User does not exist" });
      }
    } else {
      const errors = [];
      if (schemaResult.errors) {
        for (let err of result.errors) {
          errors.push(err);
        }
      }
      return res.json({
        status: "error",
        errors: errors,
      });
    }
  } catch {
    return res.json({ error: "Server Error" });
  }
}
