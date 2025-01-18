import React from "react";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <div className="w-[400px] h-[600px] bg-gradient-to-b from-[#1e1e2f] via-[#302b63] to-[#24243e] shadow-lg flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-[#302b63] text-white border-b border-white/20">
          <h1 className="text-lg font-semibold m-0">Your Classrooms</h1>
          <button
            // onClick={handleLogout}
            onClick={() => navigate("/")} // test, remove later
            className="text-gray-300 hover:text-yellow-500 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
