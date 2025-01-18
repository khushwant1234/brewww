/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ArrowLeft, Bot, Coffee, NotebookPen } from "lucide-react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../utils/storage";
import { useContext } from "react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Lectures");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleBack = () => {
    // Add navigation logic here
    console.log("Back clicked");
    navigate("/home");
  };

  const handleLogout = () => {
    // Clear user data from context
    setUser(null);
    // Clear any stored tokens or session data
    removeItem("token"); // Adjust based on your authentication setup
    // Navigate to login page
    navigate("/");
  };

  return (
    <nav className="bg-[#D29573] pt-8 pb-0 px-4">
      <div className="flex justify-between items-center mb-4">
        {/* Left - Back button */}
        <button
          onClick={handleBack}
          className="text-[#5b3d2a] hover:text-[#846359] transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Center - Navigation Tabs */}
        <div className="flex space-x-6 text-[#5b3d2a] font-semibold text-base">
          <button
            className={`${
              activeTab === "Lectures"
                ? "text-[#5b3d2a] text-base font-bold"
                : "text-[#846359]"
            }`}
            onClick={() => setActiveTab("Lectures")}
          >
            Lectures
          </button>
          <div className="border-l border-[#846359] h-6"></div>
          <button
            className={`${
              activeTab === "Tutorials"
                ? "text-[#5b3d2a] text-base font-bold"
                : "text-[#846359]"
            }`}
            onClick={() => setActiveTab("Tutorials")}
          >
            Tutorials
          </button>
          <div className="border-l border-[#846359] h-6"></div>
          <button
            className={`${
              activeTab === "Labs"
                ? "text-[#5b3d2a] text-base font-bold"
                : "text-[#846359]"
            }`}
            onClick={() => setActiveTab("Labs")}
          >
            Labs
          </button>
        </div>

        {/* Right - Logout button */}
        <button
          onClick={handleLogout}
          className="text-black hover:text-white transition-colors"
        >
          <u>Logout</u>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
