/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar"; // Import the Navbar component

const LectureList = () => {
  const lectures = [
    { id: 1, title: "Lec - 01 Course Introduction" },
    { id: 2, title: "Lec - 02" },
    { id: 3, title: "Lec - 03" },
  ];

  return (
    <div className="min-h-screen bg-[#D29573]">
      {/* Navbar */}
      <Navbar />

      {/* Lecture List */}
      <div className="flex justify-center mt-6 p-2"> {/* Added margin-top for spacing */}
        <div className="w-full max-w-md rounded-lg p-2">
          {/* Lecture Items */}
          <div className="space-y-4">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="flex items-center justify-between bg-[#DAA17E] rounded-lg p-4" // Changed background color
              >
                {/* Lecture Title */}
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-600 rounded"></div>
                  <span className="text-white font-medium truncate">
                    {lecture.title}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 text-white">
                  <i className="fas fa-coffee"></i> {/* Coffee Icon */}
                  <i className="fas fa-edit"></i> {/* Notebook Icon */}
                  <button className="w-6 h-6 flex items-center justify-center bg-orange-600 text-white rounded-full">
                    &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Coffee Pot Button */}
          <button className="fixed bottom-4 right-4 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg">
            <i className="fas fa-coffee"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureList;
