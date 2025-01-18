/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar"; // Import the Navbar component

const ReferenceLinks = () => {
  const links = [
    {
      id: 1,
      title: "How to solve problem 1.1 in ch-1",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png", // YouTube icon
    },
    {
      id: 2,
      title: "Best strategies for solving advanced problems in exams and beyond",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/39/Up-arrow-icon.png", // Up-arrow icon
    },
  ];

  return (
    <div className="min-h-screen bg-[#D29573]">
      {/* Navbar */}
      <Navbar />

      {/* Reference Links Section */}
      <div className="max-w-md mx-auto px-4 mt-10">
        {/* Section Header */}
        <div className="flex items-center mb-4">
          {/* Image beside Summary heading */}
          <img
            src="/icons/coffeebean.svg" // Replace with the actual image path
            alt="Summary Icon"
            className="w-7 h-7 mr-2 align-middle" // Adjust the size and alignment of the image
          />
          <span className="text-2xl text-[#5b3d2a] font-bold">Summary</span>
        </div>
        {/* Links */}
        <ul className="space-y-4">
          {links.map((link) => (
            <li
              key={link.id}
              className="flex items-center bg-[#ECBB9B] rounded-lg shadow p-2"
            >
              {/* Icon */}
              <img
                src={link.icon}
                alt={`${link.title} icon`}
                className="w-8 h-8 rounded-full mr-3"
              />
              {/* Title with ellipsis */}
              <span className="text-sm font-medium text-gray-700 truncate overflow-hidden whitespace-nowrap">
                {link.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReferenceLinks;
