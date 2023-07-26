import { Schema, model } from "mongoose";

const assignmentSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      trim: true,
      required: true,
      default: "To Do",
      enum: ["To Do", "In Progress", "Done"],
    },
    fileUploads: [
      {
        type: "String",
      },
    ],
    responses: [
      {
        type: "String",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Assignment", assignmentSchema);
