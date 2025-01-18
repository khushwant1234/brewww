/* eslint-disable no-unused-vars */
import { GetApiCall } from "../utils/apiCall";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { removeItem } from "../utils/storage.js";
import { UserProvider } from "../context/userContext";

const Homepage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  {
    console.log("homepage");
  }
  const { setUser, setSelectedCourse } = useContext(UserContext);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await GetApiCall("http://localhost:8000/api/user/");
      console.log("getUser response", response);
      setUser(response.data.user);
      0;
      setCourses(response.data.courses);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // Clear user data from context
    // setUser(null);
    // Clear any stored tokens or session data

    // try {
    //   setLoading(true);

    //   const response = await PostApiCall("http://localhost:8000/api/lecture/", {
    //     url: "https://learn-eu-central-1-prod-fleet01-xythos.content.blackboardcdn.com/5f1e65938f97d/4158276?X-Blackboard-S3-Bucket=learn-eu-central-1-prod-fleet01-xythos&X-Blackboard-Expiration=1737234000000&X-Blackboard-Signature=BP%2BQPxMUdQAzWFodics%2B%2FAGk9sHP8e7gcqkRdp6%2FRN0%3D&X-Blackboard-Client-Id=511318&X-Blackboard-S3-Region=eu-central-1&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%2701_lecture_CourseConent.pdf&response-content-type=application%2Fpdf&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aDGV1LWNlbnRyYWwtMSJIMEYCIQDDrVboWXBtFJkuNmTeES81Omy79cS3Z9LPXrtzdD1rkAIhANDcxDzpNEu4Cm3F0YCF1UiiFfdpZa9GTAuXs47uTsi2Kr4FCHgQBBoMNjM1NTY3OTI0MTgzIgxd5Kj%2FtxLhdc31zbkqmwU3jLFmWnVouN03vrDBDH30VswIN%2FEkGLeX%2FQQyKN6Y968skucbHbjcGDDSqgHtuR1so3cSCA9qxv49xcHWNIgBDHxH4WqWfdRXpwHoCc0B3iQbw8x5MNBUIJMzhwlDQXdXw%2FfwmUMJ3rKjfstqHwnutcPRGQI8eA3d79pv%2F3o%2Bl8wG9UMHAJaJZQ%2FLubBqJEG%2Fy6VRVcH3%2B%2BAEZUgQdpUQIh4a8%2FZ4R1RPZ9fMNd4zG3KLruMREX12grJnAnhDVOIB2ykJ8aNj46pgHzTTxkcQ1iLEg9%2FjJL2dHM4KrOXI58YfNumziQwRzsegTh%2BsU%2BcdoDO0MggdTlT4u05jPdmdiUA2xET6Cpqu4D8G4OJa5msWuPRA%2FbNoC4S8%2Fb1jLz5x3EhsW4vWaJgvJom0VufoDEXVoXNJg414IH9tTVfmfOdhY8TelD9YZtWou%2FeRjXPiD2lO7fDP4GAlIELRimRXZqfoBsV7GhYBx2Q5n0OzIfaMHdMCrfvtmgiYVVYR%2BgyIHtUv3aOQew5wIBlWEg4THho85PSnXlgxzSHfryB7mIXAgUpFRbHIZF6idr2YOlQ0J3ysYMAA1B%2FPeNO%2BDjbnsc79cal%2BudlFtOhb3YOODpOl7ZRt91FSHtSWdQlNNBI0UYYu3Mw5whZXYEOjnurydvOjbnkX33EwbE47NFzW0xr%2B5XZbl0gpFLH7kPSBM8EHt0hyDZjAIIb5l2XI2vTooiO7dtSp4Z6OfNT9S0l1RxGF%2BhYNWyo5nYxwlQW8FZIWzVCLbA1xsRFVTamFYP3xsCPIIU6p%2FmwRNeHKtexsRFnq%2FhPGDEvH6eiYvczxkhuR8BLnlXz2VTj5qk%2Fab%2B2FggMz9QrbgHPqR3mVypauBqAT%2BX18QOSR%2Bn7WMMaBr7wGOrABqWZavB%2BG2%2FpBD50QjDt%2FiHyHH68s5mCQ978Zqe0%2F%2FrwHSqDc5agpyHzi8hdrBZVgbrBN%2BNqlF1YGLNvlvdBp%2BWyPwwgp%2Br%2F%2FTBwhfPkpCNIFfamlD3QAbVBTCaz38bRXdlyAUUVKcYYupCtwoYnUiFS6lz87YMYyGaG8t%2FJL0dgKRXBh%2BXLc3jR3alf1TVgFWSGa6SotQejfpcVkYBvDXZcrH1JuwlG1%2BNpV76YACeo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250118T150000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=ASIAZH6WM4PL7DSFVK3N%2F20250118%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=c2340aff1aff49f77092339a13a39d9c5b47388b920e3bbd13d555a0939f9709",
    //     lectureName: "Course Content",
    //     batch: "27",
    //     branch: "ECE",
    //     course: "CSD102",
    //   });

    //   if (response.success) {
    //     // Update local state with new notes
    //     // setNotes(noteContent);
    //     // You might want to show a success message here
    //     toast.success("Lecture created successfully");
    //   } else {
    //     toast.error("Failed to create Lecture");
    //   }
    // } catch (err) {
    //   console.error("Create Lecture error:", err);
    //   toast.error("Error creating Lecture");
    // } finally {
    //   // setLoading(false);
    // }

    removeItem("token"); // Adjust based on your authentication setup
    // Navigate to login page
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#D29573] text-white font-sans">
        <div className="w-full h-screen bg-[#D29573] shadow-lg flex flex-col overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center justify-between p-4 bg-[#D29573] text-white border-b border-white/20">
            <h1 className="text-lg font-semibold m-0">Your Classrooms</h1>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300"
            >
              Logout
            </button>
          </div>

          {/* <div className="h-12 flex items-center bg-transparent rounded-lg">
            <button
              onClick={() => navigate("/lecture")}
              className="w-full h-full bg-[#302b63] rounded-lg shadow-md"
            >
              Lecture 1
            </button>
          </div> */}

          {/* Classroom List Section */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-12 flex items-center bg-transparent rounded-lg"
              >
                <SkeletonTheme
                  baseColor="#1e1e2f"
                  highlightColor="#302b63"
                  width="355px"
                  height="48px"
                >
                  <Skeleton
                    containerClassName="rounded-lg shadow-md"
                    borderRadius="8px"
                  />
                </SkeletonTheme>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-slate-700 flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="h-full bg-[#D29573]">
      {/* Instructions Component Start */}
      {courses.length === 0 && (
        <div className="flex justify-center items-center min-h-screen bg-[#D29573] text-white font-sans">
          <div className="w-full h-screen bg-[#D29573] shadow-lg flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-[#D29573] text-white border-b border-white/20">
              <h1 className="text-lg font-semibold m-0">Your Courses:</h1>
              <button
                onClick={handleLogout}
                className="text-black hover:white transition-colors duration-300"
              >
                Logout
              </button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-5">
              <div className="text-lg text-yellow-500 mb-6 p-4 bg-[#D29573]/30 border border-yellow-500/20 rounded-lg text-center">
                First time user? Read instructions to get started
              </div>
              <h1 className="text-2xl text-yellow-500 mb-6">Instructions:</h1>
              <ul className="flex flex-col gap-6">
                {[...Array(5).keys()].map((index) => (
                  <li
                    key={index}
                    className="flex items-start p-4 bg-[#D29573]/30 rounded-lg transition-transform duration-300 hover:translate-x-2 hover:bg-[#D29573]/50"
                  >
                    <span className="text-yellow-500 text-lg font-semibold mr-4 min-w-[25px]">
                      {index + 1}.
                    </span>
                    <span className="text-white text-base leading-6">
                      {
                        [
                          "Go to any of your course in the classroom",
                          "Scroll till the bottom and wait for every PDF to be loaded",
                          "Make sure you are authenticated, then click on the process button in the top right",
                          "Wait for the process to complete. You can change tabs but please don't close the browser",
                          "After completion, reload the extension to see your course on the homepage with all lectures and features",
                        ][index]
                      }
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Instructions Component End */}

      {/* Classrooms Component Start */}
      {courses.length > 0 && (
        <div className="flex justify-center items-center min-h-screen bg-[#D29573] text-white font-sans">
          <div className="w-full h-screen bg-[#D29573] shadow-lg flex flex-col overflow-hidden">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 bg-[#D29573] text-white border-b border-white/20">
              <h1 className="text-lg font-semibold m-0">Your Classrooms</h1>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-300"
              >
                Logout
              </button>
            </div>

            {/* Classroom List Section */}
            <div className="flex-1 p-5 overflow-y-auto space-y-5">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="h-12 flex items-center px-4 bg-[#DAA17E] rounded-lg text-white shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-[#ca9777] hover:text-black"
                  onClick={() => {
                    setSelectedCourse(course);
                    navigate("/lecture");
                  }}
                >
                  {course.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Classrooms Component End */}
    </div>
  );
};

// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         {/* Your routes/components */}
//         <Homepage />
//       </Router>
//     </UserProvider>
//   );
// }

export default Homepage;
