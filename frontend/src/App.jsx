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
import { useState, useEffect } from "react";
import { getUser } from "./scripts/user-utils.js";

import {
  getFileId,
  getDownloadLink,
  getDriveLinks,
} from "./scripts/drive-utils.js";

// eslint-disable-next-line react/prop-types
import ReferenceLinks from "./pages/links.jsx";
import Signup from "./pages/signup.jsx";
import Smth from "./pages/smth.jsx";
import { time } from "console";
// import Login from "./pages/login.jsx"
const PrivateRoute = ({ element }) => {
  const [authStatus, setAuthStatus] = useState({
    isChecked: false,
    hasToken: false,
  });

  useEffect(() => {
    const injectButton = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (!tabs[0]?.id) {
          console.error('No active tab found');
          return;
        }

        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            if (document.getElementById('extension-button')) return;
            
            // Create Button
            const button = document.createElement("button");
            
            button.id = 'extension-button';
            Object.assign(button.style, {
              position: "fixed",
              top: "120px",
              right: "10px",
              zIndex: "999999",
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
            });
            button.onmouseover = () => (button.style.backgroundColor = "#0056b3");
            button.onmouseout = () => (button.style.backgroundColor = "#007bff");
            button.textContent = "Process Courses";

            // Create Status Div
            const statusDiv = document.createElement("div");
            statusDiv.id = 'extension-status';
            Object.assign(statusDiv.style, {
              position: "fixed",
              top: "160px",
              right: "10px",
              zIndex: "999999",
              padding: "8px",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontFamily: "Arial, sans-serif",
              fontSize: "12px",
              display: "none",
            });
            
            // Add elements to page
            document.body.appendChild(button);
            document.body.appendChild(statusDiv);
            
            // Add click handler
            button.addEventListener("click", () => {
              statusDiv.style.display = "block";
              statusDiv.textContent = "Processing...";
              // var s = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getSource", source: s});
              // console.log(s);
              try {
                // Safety check for document
                if (!document || !document.querySelector) {
                  console.warn('Document not ready');
                  return [];
                }
            
                // Find all anchors that match lecture slide links
                const anchors = document.querySelectorAll('a');
                console.log('Found anchors:', anchors?.length);
            
                const linkObjects = [];
            
                anchors.forEach(anchor => {
                  console.log('anchor', anchor);
                  const href = anchor.getAttribute('href');
                  console.log('href', href);
                  const originalPath = href?.split('?')[0]; // Get path without query params
                  
                  // Extract content id from onClick or href
                  const contentId = href?.match(/content-rid-(\d+)/)?.[1] || 
                                   anchor.getAttribute('onClick')?.match(/content_id=_(\d+)_/)?.[1];
            
                  if (originalPath) {
                    linkObjects.push({
                      href: originalPath,
                      text: anchor.textContent.trim(),
                      contentId,
                      fullHref: href
                    });
                  }
                });
            
                console.log('Processed links:', linkObjects);
                return linkObjects;
            
              } catch (error) {
                console.error('Error in getDriveLinks:', error);
                return [];
              }
            });
          }
        }).catch(err => console.error('Script injection failed:', err));
      });
    };

    injectButton();
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

const App = () => {
  useEffect(() => {
    }, []); // Run once when extension opens

  return (
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
          <Route path="/notes" element={<PrivateRoute element={<Notes />} />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
