import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { Course } from "../models/courseModel.js";
import { Lab } from "../models/labModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const postLab = AsyncHandler(async (req, res) => {
  console.log("******** postLab Function ********");
  const { url, name, batch, branch } = req.body;
  console.log("req.body: ", req.body);

  let flag = false;

  let course = await Course.findOne({ name: req.body.course });

  if (!course) {
    console.log("Course not found, creating new course");
    course = await Course.create({
      name: req.body.course,
      branch,
      batch,
    });
  }

  let lab = await Lab.findOne({
    name: name,
    course: course._id,
  });

  if (!lab) {
    flag = true;
    console.log("lab not found, creating new lab");
    lab = await Lab.create({
      name: name,
      course: course._id,
      link: url,
      batch,
      branch,
    });
  }

  return res.status(200).json(new ApiResponse(200, lab, "lab created"));
});

export const getLabs = AsyncHandler(async (req, res) => {
  console.log("******** getLab Function ********");
  const { courseId, batch, branch } = req.body;

  const labs = await Lab.find({ course: courseId, batch, branch });
  console.log("labs: ", labs);
  if (!labs) {
    throw new ApiError(404, "No labs found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, labs, "labs fetched successfully"));
});