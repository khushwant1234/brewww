/* eslint-disable no-unused-vars */
import { GetApiCall } from "../utils/apiCall";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { removeItem } from "../utils/storage.js";

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

    removeItem("token"); // Adjust based on your authentication setup
    // Navigate to login page
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#D29573] text-black font-sans">
        <div className="w-full h-screen bg-[#D29573] shadow-lg flex flex-col overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center justify-between p-4 bg-[#D29573] text-black border-b border-white/20">
            <h1 className="text-lg font-semibold m-0">Your Courses</h1>
            <button
              onClick={handleLogout}
              className="text-black hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          </div>

          {/* Classroom List Section */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-12 flex items-center bg-transparent rounded-lg"
              >
                <SkeletonTheme
                  baseColor="#9D6D5B"
                  highlightColor="#7D4448"
                  width="320px"
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
        <div className="flex justify-center items-center min-h-screen bg-[#D29573] text-black font-sans">
          <div className="w-full h-screen bg-[#D29573] shadow-lg flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-[#D29573] text-black border-b border-white/20">
              <h1 className="text-lg font-semibold m-0">Your Courses:</h1>
              <button
                onClick={handleLogout}
                className="text-black hover:text-white transition-colors duration-300"
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
        <div className="flex justify-center items-center min-h-screen bg-[#D29573] text-black font-sans">
          <div className="w-full h-screen bg-[#D29573] shadow-lg flex flex-col overflow-hidden">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 bg-[#D29573] text-black border-b border-white/20">
              <h1 className="text-lg font-semibold m-0">Your Classrooms</h1>
              <button
                onClick={handleLogout}
                className="text-black hover:text-white transition-colors duration-300"
              >
                Logout
              </button>
            </div>

            {/* Classroom List Section */}
            <div className="flex-1 p-5 overflow-y-auto space-y-5">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="h-12 flex items-center px-4 bg-[#DAA17E] rounded-lg text-black shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-[#ca9777] hover:text-white"
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
