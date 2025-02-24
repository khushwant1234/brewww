import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../models/courseModel.js";

export const getUserData = AsyncHandler(async (req, res) => {
  console.log("******** getUserData Function ********");
  const user = req.user;
  const batch = user.batch;
  const branch = user.branch;
  console.log("User:", user);
  console.log("Batch:", batch);
  console.log("Branch:", branch);

  const courses = await Course.find({ batch, branch });
  console.log("Courses:", courses);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        courses,
      },
      "User data fetched successfully"
    )
  );
});
