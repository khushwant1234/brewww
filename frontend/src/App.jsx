/* eslint-disable no-unused-vars */
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Homepage";
import Test from "./pages/Test.jsx";
import Lecture from "./pages/Lecture";
import { getItem } from "./utils/storage.js";
import { Navigate } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import { LogIn } from "lucide-react";
import Login from "./pages/login.jsx";
import LectureList from "./pages/lectures.jsx";
<<<<<<< HEAD
import ReferenceLinks from "./pages/links.jsx";
// import { useState, useEffect } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 3cc2286b2e238eb2373e1c4e5abfd9d004e57593

const PrivateRoute = ({ element }) => {
  const [authStatus, setAuthStatus] = useState({
    isChecked: false,
    hasToken: false,
  });

  useEffect(() => {
    const validateToken = async () => {
      const token = await getItem("token");
      console.log("token", token);
      setAuthStatus({
        isChecked: true,
        hasToken: !!token,
      });
    };

    validateToken();
  }, []);

  // Show loading while checking token
  if (!authStatus.isChecked) {
    return <div>Loading...</div>; // Or your loading component
  }

  // Redirect to login if no token
  if (!authStatus.hasToken) {
    return <Navigate to="/login" />;
  }

  // Return protected route component if authenticated
  return element;
};

const CheckAuth = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getItem("token");
      console.log("token", token);
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or your loading component
  }

  // Redirect if authenticated
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  // Return the original element if not authenticated
  return element;
};

const App = () => {
  return (
<<<<<<< HEAD
    <>
      <div className="h-[600px] w-[400px] bg-white">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <MemoryRouter>
          <Routes>
            {/* <Route path="/" element={<CheckAuth element={<Auth />} />} /> */}
            <Route
              path="/" // write /home instead of / to redirect to home page
              // element={<PrivateRoute element={<HomePage />} />}
              element={<HomePage />}
            />
            <Route path="/tuah" element={<Test />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/summary" element={<summary />} />
            <Route path="/links" element={<ReferenceLinks/>} />
          </Routes>
        </MemoryRouter>
      </div>
    </>
=======
    <div className="h-screen w-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<CheckAuth element={<Auth />} />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          />
          {/* <Route
            path="/chatbot"
            element={<PrivateRoute element={<ChatBot />} />}
          /> */}
          <Route
            path="/lecture"
            element={<PrivateRoute element={<Lecture />} />}
          />
          <Route path="/notes" element={<PrivateRoute element={<Notes />} />} />
        </Routes>
      </MemoryRouter>
    </div>
>>>>>>> 3cc2286b2e238eb2373e1c4e5abfd9d004e57593
  );
};

export default App;
