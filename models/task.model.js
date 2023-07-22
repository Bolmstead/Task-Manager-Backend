import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
      enum: ["To Do", "In Progress", "Done"],
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignments: [
      {
        type: Schema.Types.ObjectId,
        ref: "assignments",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Task", taskSchema);
