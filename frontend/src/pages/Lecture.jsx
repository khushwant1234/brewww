import React, { useState, useContext, useEffect } from "react";
import {
  ArrowLeft,
  Bot,
  MoreVertical,
  ChevronDown,
  NotebookPen,
} from "lucide-react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { PostApiCall } from "../utils/apiCall";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import { removeItem } from "../utils/storage.js";

const Classroom = () => {
  const [activeTab, setActiveTab] = useState("lectures");
  const [showFilter, setShowFilter] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tagsGroupedByLecture, setTagsGroupedByLecture] = useState([]);
  const [update, setUpdate] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); //for Modal
  const [selectedFilter, setSelectedFilter] = useState(null); // for filter
  const [filterId, setFilterId] = useState("676dda2f2e9bba9d072d3b5d");
  const [initialTagss, setInitialTagss] = useState(["a"]);

  // const [filterId, setFIlterId] = useState(
  //   tagsGroupedByLecture.find(group => group.tags.includes(tagName))?.lectureId
  // );

  const {
    user,
    selectedCourse,
    setSelectedLecture,
    setSelectedLectureId,
    selectedLectureId,
    setLecturesChat,
    lecturesChat,
  } = useContext(UserContext);

  const navigate = useNavigate();

  console.log("selectedCourse", selectedCourse);
  console.log("user", user);

  const fetchLectures = async () => {
    try {
      const response = await PostApiCall(
        "http://localhost:8000/api/lecture/getLectures",
        {
          courseId: selectedCourse._id,
          batch: user.batch,
          branch: user.branch,
        }
      );
      setLectures(response.data);
      console.log("getLectures response", response);
    } catch (err) {
      console.log("getLectures error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedCourse) {
      navigate("/home");
    }
    fetchLectures();
    fetchAllTags();
  }, []);

  useEffect(() => {
    console.log("tagsGroupedByLecture", tagsGroupedByLecture);
    const tagSet = new Set();
    const tempAllTags = [];

    for (const lectureSpecificTags of tagsGroupedByLecture) {
      for (const tag of lectureSpecificTags.tags) {
        if (!tagSet.has(tag)) {
          tagSet.add(tag);
          tempAllTags.push(tag);
        }
      }
    }

    setAllTags(tempAllTags);
    console.log("allTags", tempAllTags);
  }, [tagsGroupedByLecture]);

  const fetchAllTags = async () => {
    try {
      const response = await PostApiCall(
        "http://localhost:8000/api/tag/getAllTags",
        {
          courseID: selectedCourse._id,
          userID: user._id,
        }
      );
      setTagsGroupedByLecture(response.data.groupedByLecture);
      console.log("getTags response", response.data.groupedByLecture);
    } catch (err) {
      console.log("getTags error", err);
    }
  };

  // useEffect(() => {
  //   getTagsForLecture(selectedLectureId);
  // }, [update]);

  const getTagsForLecture = (lectureId) => {
    const lecture = tagsGroupedByLecture.find(
      (item) => item.lectureId === lectureId
    );
    console.log("lecture in getTagsForLecture", lecture ? lecture.tags : []);
    // setInitialTagss(lecture ? lecture.tags : []);
    return lecture ? lecture.tags : []; // Return tags if found, otherwise return an empty array
  };

  const handleUpdateTags = async (tags, id) => {
    const tagList = tags;
    console.log("tagList in handleupdatetags", tagList);
    console.log("lectureid in handleupdatetags", id);

    try {
      setLoading(true);

      const response = await PostApiCall("http://localhost:8000/api/tag", {
        TAGS: tagList,
        lectureID: id,
        courseID: selectedCourse._id,
        userID: user._id,
      });

      if (response.success) {
        // Update local state with new notes
        setUpdate(tagList);

        ////LOOK INTO THIS LATER
        // You might want to show a success message here
        toast.success("Tags created successfully");
      } else {
        toast.error("Failed to create tags");
      }
    } catch (err) {
      console.error("Create tags error:", err);
      toast.error("Error creating tags");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // Clear user data from context
    // setUser(null);
    // Clear any stored tokens or session data

    removeItem("token"); // Adjust based on your authentication setup
    // Navigate to login page
    navigate("/");
  };

  useEffect(() => {
    const updateFilterId = (newTagName) => {
      console.log("newTagName", selectedFilter);
      setFilterId(
        tagsGroupedByLecture.find((group) => group.tags.includes(newTagName))
          ?.lectureId
      );
      console.log("filterId", filterId);
    };
    updateFilterId(selectedFilter);
  }, [selectedFilter]);

  const clearContent = () => {
    setShowFilter(false);
    setShowOptionsMenu(null);
  };

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null);
      clearContent();
    } else {
      setActiveTab(tab);
    }
  };

  const renderFilterDropdown = () => {
    if (!showFilter) return null;

    const filterOptions =
      activeTab === "lectures"
        ? allTags
        : activeTab === "assignments"
        ? ["Due", "Missing", "Submitted"]
        : ["Recent", "Important", "All"];

    return (
      <div className="absolute top-8 right-0 rounded-lg w-40 bg-gray-300 shadow-lg z-50">
        {filterOptions.map((option, index) => (
          <button
            key={index}
            className="w-full text-left px-4 py-2 text-black hover:bg-gray-400 cursor-pointer transition-colors"
            onClick={() => setSelectedFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  const renderOptionsMenu = (index, url, lectureid) => {
    if (showOptionsMenu !== index) return null;

    return (
      <div className="absolute right-0 top-6 rounded-lg w-40 bg-gray-300 shadow-lg z-50">
        <p className="px-4 py-2 text-black hover:bg-gray-400 cursor-pointer transition-colors">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-transparent text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Manage Tags
          </button>
          {console.log("initialTagss", initialTagss)}
          {/* {console.log("lectureid", selectedLectureId)} */}
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Manage Tags"
            initialTags={getTagsForLecture(lectureid)}
            onTagsUpdate={handleUpdateTags}
          />
        </p>
        <a href={url} download>
          <p className="px-4 py-2 text-black hover:bg-gray-400 cursor-pointer transition-colors">
            Download
          </p>
        </a>
      </div>
    );
  };

  const renderContent = () => {
    if (!activeTab) return null;

    if (activeTab === "lectures") {
      return (
        <div className="container mx-auto ">
          {/* Filter Section */}
          <div className="flex justify-end mb-4">
            <div
              className="flex items-center space-x-2 bg-transparent hover:bg-[#A05854] pl-4 pr-3 py-2 rounded-lg cursor-pointer"
              onClick={() => setShowFilter(!showFilter)}
            >
              <span>Filter</span>
              <ChevronDown size={16} />
            </div>
            {renderFilterDropdown()}
          </div>

          {/* Lectures Grid */}
          <div className="grid grid-ctext-base md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lectures
              .filter((lecture) => {
                if (!selectedFilter) return true;
                const lectureTags =
                  tagsGroupedByLecture.find(
                    (group) => group.lectureId === lecture._id.toString()
                  )?.tags || [];
                return lectureTags.includes(selectedFilter);
              })
              .slice()
              .reverse()
              .map((lecture, index) => (
                <div
                  key={index}
                  className="h-12 flex items-center justify-between pr-2 bg-[#DAA17E] rounded-lg text-white shadow-md "
                >
                  {/* Lecture Card Header */}
                  <div className=" text-black p-4 ">
                    <h3 className="font-medium truncate">{lecture.name}</h3>
                  </div>

                  {/* Lecture Card Actions */}
                  <div className="p-4 pr-0 flex justify-end space-x-4">
                    <button>
                      <i href="/icons/notes.svg"></i>
                    </button>
                    <NotebookPen
                      size={20}
                      className="text-gray-600 hover:text-teal-600 hover:scale-110 transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedLecture(lecture);
                        navigate("/notes");
                      }}
                    />
                    <Bot
                      size={20}
                      className="text-gray-600 hover:text-teal-600 hover:scale-110 transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedLecture(lecture);
                        setLecturesChat([...lecturesChat, lecture.link]);
                        // navigate("/chatbot");
                      }}
                    />
                    <div className="relative">
                      <MoreVertical
                        size={20}
                        className="text-gray-600 hover:text-teal-600 hover:scale-110 transition-all cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowOptionsMenu(
                            showOptionsMenu === index ? null : index
                          );
                          setSelectedLectureId(lecture._id);
                        }}
                      />
                      {renderOptionsMenu(index, lecture.link, lecture._id)}
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  console.log(lecturesChat);
                  navigate("/chatbot");
                }
              }
              >
                Chatbot
              </button>
          </div>
        </div>
      );
    }
    // ... rest of your renderContent logic for other tabs
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#D29573] text-white font-sans">
        <div className="w-full h-screen bg-[#D29573] shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-2.5 px-4 py-2 bg-[#DAA17E] border-b border-white/20">
            <div className="flex items-center gap-2.5">
              <ArrowLeft
                className="text-black hover:text-white cursor-pointer transition-colors"
                size={20}
                onClick={() => navigate("/home")}
              />
              <h1 className="text-md text-black font-medium text-antique-white m-0">
                {selectedCourse.name}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-black hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          </div>
          <div className="pt-0 p-6 overflow-auto flex-1">
            {/* Feature List with Active Lectures Tab */}

            <div className="flex items-center p-4 bg-[#DAA17E] rounded-lg shadow-inner">
              <div
                className={`w-1/3 flex flex-row items-center justify-around cursor-pointer ${
                  activeTab === "lectures"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("lectures")}
              >
                <p className="m-0 mx-1 text-base font-semibold">Lectures</p>
                <p className="m-0 mx-1 text-xl">|</p>
              </div>
              <div
                className={`w-1/3 flex flex-row items-center justify-around cursor-pointer mx-2.5 ${
                  activeTab === "assignments"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("assignments")}
              >
                <p className="m-0 mx-1 text-base font-semibold">Tutorials</p>
              </div>
              <div
                className={`w-1/3 flex flex-row items-center justify-around cursor-pointer ${
                  activeTab === "misc"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("misc")}
              >
                <p className="m-0 mx-1 text-xl">|</p>
                <p className="m-0 mx-1 text-base font-semibold">Lab</p>
              </div>
            </div>

            {/* Filter Button */}
            <div className="relative flex justify-end flex-col items-end mb-4">
              <div className="flex items-center space-x-2 bg-transparent hover:bg-[#A05854] pl-4 pr-3 py-2 rounded-lg cursor-pointer">
                <p>Filter</p>
                <ChevronDown size={16} />
              </div>
            </div>

            {/* Lecture List Skeleton */}
            <div className="space-y-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#9D6D5B] h-[40px] rounded-lg"
                >
                  <SkeletonTheme baseColor="#9D6D5B" highlightColor="#7D4448">
                    <div className="flex w-full h-full justify-between items-center">
                      <div className="h-[100%] w-[100%]">
                        <Skeleton height={35} className="rounded-lg" />
                      </div>
                    </div>
                  </SkeletonTheme>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#D29573] text-white">
      <div className="w-full">
        <div className="min-h-screen bg-[#D29573] shadow-lg overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between gap-2.5 px-4 py-2 bg-[#DAA17E] border-b border-white/20">
            <div className="flex items-center gap-2.5">
              <ArrowLeft
                className="text-black hover:text-white cursor-pointer transition-colors"
                size={20}
                onClick={() => navigate("/home")}
              />
              <h1 className="text-md text-black font-medium text-antique-white m-0">
                {selectedCourse.name}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-black hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="pt-0 p-6 overflow-auto flex-1">
            {/* Feature List */}
            <div className="flex items-center p-4 bg-transparent rounded-lg shadow-inner">
              <div
                className={`w-1/3 flex flex-row items-center justify-around cursor-pointer ${
                  activeTab === "lectures"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("lectures")}
              >
                <p className="m-0 mx-1 text-base font-semibold">Lectures</p>
                <p className="m-0 mx-1 text-xl">|</p>
              </div>
              <div
                className={`w-1/3 flex flex-row items-center justify-around cursor-pointer mx-2.5 ${
                  activeTab === "assignments"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("assignments")}
              >
                <p className="m-0 mx-1 text-base font-semibold">Tutorials</p>
              </div>
              <div
                className={`w-1/3 flex flex-row items-center justify-around cursor-pointer ${
                  activeTab === "misc"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("misc")}
              >
                <p className="m-0 mx-1 text-xl">|</p>
                <p className="m-0 mx-1 text-base font-semibold">Lab</p>
              </div>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
