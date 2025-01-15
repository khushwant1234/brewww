import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Homepage";
import tuah from "./pages/tuah.jsx";
import { getItem } from "./utils/storage.js";
import { Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
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
            <Route path="/tuah" element={<tuah />} />
          </Routes>
        </MemoryRouter>
      </div>
    </>
  );
}

export default App;
