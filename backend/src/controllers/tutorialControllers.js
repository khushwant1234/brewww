import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { Course } from "../models/courseModel.js";
import { Tutorial } from "../models/tutorialModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const postTutorial = AsyncHandler(async (req, res) => {
  console.log("******** postTutorial Function ********");
  // const { batch, branch } = req.user; 
  const { url, name, batch, branch } = req.body;  // remove this if using s3 code
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

  let tutorial = await Tutorial.findOne({
    // name: req.file.originalname,
    name: name,
    course: course._id,
  });

  if (!tutorial) {
    flag = true;
    console.log("tutorial not found, creating new tutorial");
    tutorial = await Tutorial.create({
      // name: req.file.originalname,
      name: name,
      course: course._id,
      link: url,
      batch,
      branch,
    });
  }
  

  return res.status(200).json(new ApiResponse(200, tutorial, "tutorial created"));
});

export const getTutorials = AsyncHandler(async (req, res) => {
  console.log("******** gettutorial Function ********");
  const { courseId, batch, branch } = req.body;

  const tutorials = await Tutorial.find({ course: courseId, batch, branch });
  console.log("tutorials: ", tutorials);
  if (!tutorials) {
    throw new ApiError(404, "No tutorials found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tutorials, "tutorials fetched successfully"));
});
