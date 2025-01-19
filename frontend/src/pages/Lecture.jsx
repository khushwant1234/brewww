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

const animationStyles = `
@keyframes moveToCorner {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(calc(100vw - 100%), calc(100vh - 100%));
  }
}

.animate-to-corner {
  position: fixed;
  animation: moveToCorner 1s forwards;
  z-index: 1000;
}
`;

const Classroom = () => {
  const [activeTab, setActiveTab] = useState("lectures");
  const [showFilter, setShowFilter] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null);
  const [asContext, setAsContext] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [labs, setLabs] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tagsGroupedByLecture, setTagsGroupedByLecture] = useState([]);
  const [update, setUpdate] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

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
    setUser,
    selectedCourse,
    setSelectedLecture,
    setSelectedTutorial,
    setSelectedLab,
    setSelectedLectureId,
    selectedLectureId,
    setLecturesChat,
    lecturesChat,
    referenceLink,
    setReferenceLink,
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

  const fetchTutorials = async () => {
    try {
      const response = await PostApiCall(
        "http://localhost:8000/api/tutorial/getTutorials",
        {
          courseId: selectedCourse._id,
          batch: user.batch,
          branch: user.branch,
        }
      );
      setTutorials(response.data);
      console.log("getTutorials response", response);
    } catch (err) {
      console.log("getTutorials error", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchLabs = async () => {
    try {
      const response = await PostApiCall(
        "http://localhost:8000/api/lab/getLabs",
        {
          courseId: selectedCourse._id,
          batch: user.batch,
          branch: user.branch,
        }
      );
      setLabs(response.data);
      console.log("getLabs response", response);
    } catch (err) {
      console.log("getLabs error", err);
    } finally {
      setLoading(false);
    }
  };

  // const postLab = async (lab) => {
  //   console.log("course NAME: ", selectedCourse.name);
  //   try {
  //     const response = await PostApiCall("http://localhost:8000/api/lab", {
  //       course: selectedCourse.name,
  //       batch: user.batch,
  //       branch: user.branch,
  //       name: "Experiment 1",
  //       url: "https://learn-eu-central-1-prod-fleet01-xythos.content.blackboardcdn.com/5f1e65938f97d/4131092?X-Blackboard-S3-Bucket=learn-eu-central-1-prod-fleet01-xythos&X-Blackboard-Expiration=1737255600000&X-Blackboard-Signature=TJaqtDtU4XAB%2Fqt3H9Dg1lDzKcICE5nD76v1KiqfqdE%3D&X-Blackboard-Client-Id=511318&X-Blackboard-S3-Region=eu-central-1&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27Exp-01.pdf&response-content-type=application%2Fpdf&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJGMEQCIFzstQSNdGJLuEkrz2%2BQAwXytcLuo6PAxhCEPK%2Fc9zGdAiAgeC9i%2BGwnOXNvegYkGtLpXRVVF47YNdYo3vTqXCAJCyq%2BBQh%2FEAQaDDYzNTU2NzkyNDE4MyIMdxsfcTQpI8DpbMnWKpsFymsdanSIXkkvol0NdFMi%2Bx53NXkIBHegD18q5P%2BtfligUr%2BkyttyZHWuNWrlrx4Tq9%2BuMzMYDctJfpmz70k5O93OLzF0V7d9N2gmUgImjAng4zczv3IvSBHeZVYqiFVIB%2FKLe3lBIUMSEB7a7QUiPk6uT9I5DTjdnodaMWYe2TI87b5E095JhbTl4p8LTUVrVnTngFds3kfRe9CMkL2WDLxEtrtQoFwfpOjfZ%2BPYufs5yytPcat3VdRm3bdJeXmmHE6S6NnyR60nCS%2F2VacTkWb5dhcENBodxT5u%2Fg5HyJclbk1ZZWwl000lprXVrAZN9nHY2LFmK%2FzNE8F5N0jyidEudUh%2BPyZ%2FHQgumV%2BkZPiBUjFl9NCxWi5YBdw7VALeZ373eJ8FEopQ%2FNjFuF0F3aBGJrKbV5lIuA8DlXni6w%2BxLNYTKg%2FFaw4JAGtTZzTd4pTlIJZzVw7uXLy0VYcePK13BOWdvU8bmylisWqNTxi5AUExoC%2FQM9lqRFMF3hDxKSc8FDDgzENsUyHTBwMZbHYNWvQ1761fmiBlLtZVmMZZWuX8sO5bFo0SxfavWioH3ovUUFh0Ojz1h6B0cuDlX0HD91hEsIl6%2FOIFqI3n%2FgaXsub%2FMdtkHuW7uiZM3oHDA0wMsRaWKbUb6Njvuq27C7acGoq0CcNYf%2BjqAh1XWPz2wJZvrt4Tg%2ByeedmfFMBcWUp0O84FFEwO2F3Oxubk8eP4AYzYdjqqr5WpQKvzUsXXQ2YNw%2FWxH7PnwfztGVosD6V6hGKL3i1%2FukGpxM0iRKo8grVj8ovZMSXdYZBLW2KRjuuPSj%2Fil6JOS0IZYWmKHvIVgvAgTaIPgKP0%2BD9TM5CHmakV7I3WbJ78BV%2Bd7DABcZAScNnbGSN6RTCJxLC8BjqyAXVgkzfIWDjKO2lygTHKsMLxucTCpAafuk%2FuI17Z9niZa3XTnH7uBaaMe59Nkada%2F6WX03OAMiEsH6hX6V8fN2%2FqwU2mU7N7PhvXXmDOPPIkj%2FyWTtnN%2F1vt7hIyF51Lui%2BH1iJJgbj7%2B4yHjk9PuBBg8eP9JIFGlijhTEUFtdkRRmZmKCRZWn2Z%2FlTwpyOmGdiZWRgMHFuL9ER6hgDlt1kFNJZS3zLT4OCOFSOBr7DFlaI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250118T210000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=ASIAZH6WM4PL3ZOSIQXH%2F20250118%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=bdd66ddd9f3d449ad095ae92574086ca734918159f7efdf968c56c3b57c20782",
  //     });
  //     console.log("postLab response", response);
  //   } catch (err) {
  //     console.log("postLab error", err);
  //   }
  // };

  useEffect(() => {
    if (!selectedCourse) {
      navigate("/home");
    }
    fetchLectures();
    fetchTutorials();
    fetchLabs();
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
    setUser(null);
    // setSelectedCourse(null);
    // setSelectedLecture(null);
    // postLab();
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
      // setLoading(true);
      setActiveTab(tab);
    }
  };

  const renderFilterDropdown = () => {
    if (!showFilter) return null;

    const filterOptions =
      activeTab === "lectures"
        ? allTags
        : activeTab === "tutorials"
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
        <p
          className="px-4 py-2 text-black hover:bg-gray-400 cursor-pointer transition-colors"
          onClick={() => {
            setReferenceLink(url);
            navigate("/summary");
          }}
        >
          Summary
        </p>
        <p
          className="px-4 py-2 text-black hover:bg-gray-400 cursor-pointer transition-colors"
          onClick={() => {
            setReferenceLink(url);
            navigate("/quiz");
          }}
        >
          Quiz Generator
        </p>
        <p
          className="px-4 py-2 text-black hover:bg-gray-400 cursor-pointer transition-colors"
          onClick={() => {
            setReferenceLink(url);
            navigate("/links");
          }}
        >
          Reference
        </p>
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
                  <div className="p-4 pr-0 flex justify-end items-center space-x-2">
                    <img
                      src="/icons/coffeebean.svg"
                      size={20}
                      alt="Add Context"
                      className={`text-black hover:[#A05854] hover:scale-110 transition-all cursor-pointer w-7 h-7 ${
                        isAnimating ? "animate-to-corner" : ""
                      }`}
                      onClick={(e) => {
                        setIsAnimating(true);
                        // Wait for animation to complete
                        setTimeout(() => {
                          setSelectedLecture(lecture);
                          setLecturesChat([...lecturesChat, lecture.link]);
                          setIsAnimating(false);
                          // navigate("/chatbot");
                        }, 1000);
                      }}
                    />
                    <img
                      src="/icons/notes.svg"
                      alt="Notes"
                      className="text-black hover:[#A05854] hover:scale-110 transition-all cursor-pointer w-10 h-10"
                      onClick={() => {
                        setSelectedLecture(lecture);
                        navigate("/notes");
                      }}
                    />

                    <div className="relative">
                      <MoreVertical
                        size={15}
                        className="text-black hover:[#A05854] hover:scale-110 transition-all cursor-pointer"
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
              className="fixed bottom-0 rounded-full right-0 z-20"
              onClick={() => {
                console.log(lecturesChat);
                navigate("/chatbot");
              }}
            >
              <img src="/icons/kettle.svg" alt="Chatbot" />
            </button>
          </div>
        </div>
      );
    }
    if (activeTab === "tutorials") {
      return (
        <div className="container mx-auto ">
          {/* Lectures Grid */}
          <div className="grid grid-ctext-base md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutorials
              .filter((tutorial) => {
                if (!selectedFilter) return true;
                const tutorialTags =
                  tagsGroupedBytutorial.find(
                    (group) => group.tutorialId === tutorial._id.toString()
                  )?.tags || [];
                return tutorialTags.includes(selectedFilter);
              })
              .slice()
              .reverse()
              .map((tutorial, index) => (
                <div
                  key={index}
                  className="h-12 flex items-center justify-between pr-2 bg-[#DAA17E] rounded-lg text-white shadow-md "
                >
                  {/* tutorial Card Header */}
                  <div className=" text-black p-4 ">
                    <h3 className="font-medium truncate">{tutorial.name}</h3>
                  </div>

                  {/* tutorial Card Actions */}
                  <div className="p-4 pr-0 flex justify-end space-x-4">
                    <img
                      src="/icons/notes.svg"
                      alt="Notes"
                      className="text-black hover:[#A05854] hover:scale-110 transition-all cursor-pointer w-10 h-10"
                      onClick={() => {
                        setReferenceLink(tutorial.link);
                        navigate("/tutorialHelper");
                      }}
                    />
                    <img
                      src="/icons/notes.svg"
                      alt="Notes"
                      className="text-black hover:[#A05854] hover:scale-110 transition-all cursor-pointer w-10 h-10"
                      onClick={() => {
                        setReferenceLink(tutorial.link);
                        navigate("/TutorialLinks");
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    }
    if (activeTab === "labs") {
      return (
        <div className="container mx-auto ">
          {/* Lectures Grid */}
          <div className="grid grid-ctext-base md:grid-cols-2 lg:grid-cols-3 gap-4">
            {labs
              .filter((lab) => {
                if (!selectedFilter) return true;
                const labTags =
                  tagsGroupedBylab.find(
                    (group) => group.labId === lab._id.toString()
                  )?.tags || [];
                return labTags.includes(selectedFilter);
              })
              .slice()
              .reverse()
              .map((lab, index) => (
                <div
                  key={index}
                  className="h-12 flex items-center justify-between pr-2 bg-[#DAA17E] rounded-lg text-white shadow-md "
                >
                  {/* lab Card Header */}
                  <div className=" text-black p-4 ">
                    <h3 className="font-medium truncate">{lab.name}</h3>
                  </div>

                  {/* lab Card Actions */}
                  <div className="p-4 pr-0 flex justify-end space-x-4">
                    <img
                      src="/icons/notes.svg"
                      alt="Notes"
                      className="text-black hover:[#A05854] hover:scale-110 transition-all cursor-pointer w-10 h-10"
                      onClick={() => {
                        setReferenceLink(lab.link);
                        navigate("/LabLinks");
                      }}
                    />
                    <img
                      src="/icons/notes.svg"
                      alt="Notes"
                      className="text-gray-600 hover:text-teal-600 hover:scale-110 transition-all cursor-pointer w-10 h-10"
                      onClick={() => {
                        setReferenceLink(lab.link);
                        navigate("/LabInstructions");
                      }}
                    />
                  </div>
                </div>
              ))}
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

            <div className="flex items-center p-4 mt-2 bg-[#DAA17E] rounded-lg shadow-inner">
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
                  activeTab === "tutorials"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("tutorials")}
              >
                <p className="m-0 mx-1 text-base font-semibold">Tutorials</p>
              </div>
              <div
                className={`w-1/3 flex flex-row items-center justify-around cursor-pointer ${
                  activeTab === "labs"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("labs")}
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
                  activeTab === "tutorials"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("tutorials")}
              >
                <p className="m-0 mx-1 text-base font-semibold">Tutorials</p>
              </div>
              <div
                className={`w-1/3 flex flex-row items-center justify-around cursor-pointer ${
                  activeTab === "labs"
                    ? "text-[#7D4448] text-extrabold"
                    : "text-[#A05854] hover:text-[#9F5654]"
                }`}
                onClick={() => handleTabClick("labs")}
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
