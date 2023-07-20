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
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
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
