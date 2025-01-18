/* eslint-disable no-unused-vars */
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Homepage";
import Lecture from "./pages/Lecture";
import { getItem } from "./utils/storage.js";
import { Navigate } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import Notes from "./pages/Notes.jsx";
import { useState, useEffect, useContext } from "react";
import { UserProvider, UserContext } from "./context/userContext";

// eslint-disable-next-line react/prop-types
import ReferenceLinks from "./pages/links.jsx";
import Signup from "./pages/signup.jsx";
import Smth from "./pages/smth.jsx";
// import Login from "./pages/login.jsx"
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

// eslint-disable-next-line react/prop-types
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

// const Homepage = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [courses, setCourses] = useState([]);

//   const userContext = useContext(UserContext);
//   const { setUser } = userContext || {};

//   // ...rest of your code...

//   const fetchData = async () => {
//     try {
//       const response = await GetApiCall("http://localhost:8000/api/user/");
//       console.log("getUser response", response);
//       if (setUser) {
//         setUser(response.data.user);
//       }
//       setCourses(response.data.courses);
//       setData(response);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
// };

const App = () => {
  return (
    <UserProvider>
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
            {console.log("App.js")}
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
            <Route
              path="/notes"
              element={<PrivateRoute element={<Notes />} />}
            />
          </Routes>
        </MemoryRouter>
      </div>
    </UserProvider>
  );
};

export default App;
