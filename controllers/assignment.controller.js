import Assignment from "../models/assignment.model.js";
import User from "../models/user.model.js";

export async function getAllAssignments(req, res) {
  try {
    const assignments = await Assignment.find()
      .populate("task")
      .populate("user")
      .sort({ createdAt: -1 });

    return res.json(assignments);
  } catch (error) {
    console.log(error);
    return next(err);
  }
}

export async function getAllClientAssignments(req, res) {
  try {
    const client = await User.find({ username: req.user.username })
      .populate("assignments")
      .populate("user")
      .sort({ createdAt: -1 });

    return res.json(assignments);
  } catch (error) {
    console.log(error);
    return next(err);
  }
}

export async function getAssignmentDetails(req, res) {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("user")
      .populate("task")
      .sort({ createdAt: -1 });

    return res.json(assignment);
  } catch (error) {
    console.log(error);
    return next(err);
  }
}

export async function editAssignmentDetails(req, res) {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("user")
      .populate("task")
      .sort({ createdAt: -1 });

    const { response, status, fileUpload } = req.body;

    if (status) {
      assignment.status = status;
    }
    if (response) {
      assignment.responses.push(response);
    }
    if (fileUpload) {
      assignment.fileUploads.push(fileUpload);
    }

    const savedAssignment = await assignment.save();

    return res.json(savedAssignment);
  } catch (error) {
    console.log(error);
    return next(err);
  }
}
