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
import Quiz from "./pages/Quiz.jsx";
import Summary from "./pages/summary.jsx";
import Links from "./pages/links.jsx";
import TutorialHelper from "./pages/tutorialHelper.jsx"
import TutorialLinks from "./pages/TutorialLinks.jsx"
import { useState, useEffect, useContext } from "react";
import { UserProvider, UserContext } from "./context/userContext";
import ChatbotPage from "./pages/chatbot.jsx";

// import Login from "./pages/login.jsx"
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
  const [authStatus, setAuthStatus] = useState({
    isChecked: false,
    hasToken: false,
  });

  // useEffect(() => {
  //   const validateToken = async () => {
  //     const token = await getItem("token");
  //     console.log("token", token);
  //     setAuthStatus({
  //       isChecked: true,
  //       hasToken: !!token,
  //     });
  //   };

  //   validateToken();
  // }, []);

  // // Show loading while checking token
  // if (!authStatus.isChecked) {
  //   return <div>Loading...</div>; // Or your loading component
  // }

  // // Redirect to login if no token
  // if (!authStatus.hasToken) {
  //   return <Navigate to="/login" />;
  // }

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

const App = () => {
  useEffect(() => {}, []); // Run once when extension opens

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
            <Route
              path="/chatbot"
              element={<PrivateRoute element={<ChatbotPage />} />}
            />
            <Route
              path="/lecture"
              element={<PrivateRoute element={<Lecture />} />}
            />
            <Route
              path="/notes"
              element={<PrivateRoute element={<Notes />} />}
            />
            <Route
              path="/summary"
              element={<PrivateRoute element={<Summary />} />}
            />
            <Route path="/quiz" element={<PrivateRoute element={<Quiz />} />} />
            <Route
              path="/links"
              element={<PrivateRoute element={<Links />} />}
            />
            <Route
              path="/tutorialHelper"
              element={<PrivateRoute element={<TutorialHelper />} />}
            />
            <Route
              path="/TutorialLinks"
              element={<PrivateRoute element={<TutorialLinks />} />}
            />
          </Routes>
        </MemoryRouter>
      </div>
    </UserProvider>
  );
};

export default App;
