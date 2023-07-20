import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    isClient: {
      type: Boolean,
      required: true,
      default: true
    },
    assignments: [
      {
        type: Schema.Types.ObjectId,
        ref: "assignments",
      },
    ]
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
