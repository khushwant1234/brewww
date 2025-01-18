/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { ArrowLeft, Bot, Coffee, NotebookPen } from "lucide-react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { PostApiCall } from "../utils/apiCall";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Lecture = () => {
  // Keep your existing state variables and hooks
  const [activeTab, setActiveTab] = useState("lectures");
  const [showFilter, setShowFilter] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { user, selectedCourse, setSelectedLecture, setSelectedLectureId } =
    useContext(UserContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await GetApiCall("http://localhost:8000/api/user/");
      console.log("getUser response", response);
      setUser(response.data.user);
      setCourses(response.data.courses);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear user data from context
    setUser(null);
    // Clear any stored tokens or session data
    removeItem("token"); // Adjust based on your authentication setup
    // Navigate to login page
    navigate("/");
  };

  // Keep your existing fetch functions and useEffect

  return (
    <div className="min-h-screen bg-[#D29573]">
      {/* Navbar */}
      <Navbar />

      {/* Lecture List */}
      <div className="flex justify-center mt-6 p-2">
        <div className="w-full max-w-md rounded-lg p-2">
          {/* Filter Button */}
          {showFilter && (
            <div className="mb-4 relative">
              <div className="absolute top-0 right-0 rounded-lg w-40 bg-[#DAA17E] shadow-lg z-50">
                {allTags?.map((option, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#c99676] cursor-pointer transition-colors"
                    onClick={() => setSelectedFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lecture Items */}
          <div className="space-y-4">
            {lectures.map((lecture, index) => (
              <div
                key={lecture._id}
                className="flex items-center justify-between bg-[#DAA17E] rounded-lg p-4"
              >
                {/* Lecture Title */}
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-600 rounded"></div>
                  <span className="text-white font-medium truncate">
                    {lecture.name}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 text-white">
                  <Bot
                    size={20}
                    className="hover:scale-110 transition-transform cursor-pointer"
                    onClick={() => {
                      setSelectedLecture(lecture);
                      navigate("/chatbot");
                    }}
                  />
                  <NotebookPen
                    size={20}
                    className="hover:scale-110 transition-transform cursor-pointer"
                    onClick={() => {
                      setSelectedLecture(lecture);
                      navigate("/notes");
                    }}
                  />
                  <button
                    className="w-6 h-6 flex items-center justify-center bg-orange-600 text-white rounded-full hover:bg-orange-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowOptionsMenu(
                        showOptionsMenu === index ? null : index
                      );
                      setSelectedLectureId(lecture._id);
                      setIsOpen(true);
                    }}
                  >
                    &gt;
                  </button>
                </div>

                {/* Options Menu */}
                {showOptionsMenu === index && (
                  <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Manage Tags"
                    initialTags={getTagsForLecture(lecture._id)}
                    onTagsUpdate={handleUpdateTags}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
