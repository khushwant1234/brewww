/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Lectures"); // State to track the active tab

  return (
    <nav className="bg-[#D29573] pt-8 pb-0 px-4">
      <div className="flex justify-center space-x-6 text-[#5b3d2a] font-semibold text-base">
        <button
          className={`${
            activeTab === "Lectures" ? "text-[#5b3d2a] text-base font-bold" : "text-[#846359]"
          }`}
          onClick={() => setActiveTab("Lectures")}
        >
          Lectures
        </button>
        <div className="border-l border-[#846359] h-6"></div>
        <button
          className={`${
            activeTab === "Tutorials" ? "text-[#5b3d2a] text-base font-bold" : "text-[#846359]"
          }`}
          onClick={() => setActiveTab("Tutorials")}
        >
          Tutorials
        </button>
        <div className="border-l border-[#846359] h-6"></div>
        <button
          className={`${
            activeTab === "Labs" ? "text-[#5b3d2a] text-base font-bold" : "text-[#846359]"
          }`}
          onClick={() => setActiveTab("Labs")}
        >
          Labs
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
