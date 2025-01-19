/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/userContext";
import { PostApiCall } from "../utils/apiCall";

const LabLinks = () => {
  const {
    user,
    selectedCourse,
    setSelectedLecture,
    setSelectedLectureId,
    selectedLectureId,
    setLecturesChat,
    lecturesChat,
    referenceLink,
    setReferenceLink,
  } = useContext(UserContext);
  console.log("ROORORORO", referenceLink);
  const [reference, setReference] = useState({
    topics: [],
    youtubeLinks: [],
    articleLinks: [],
  });
  const fetchReferences = async () => {
    try {
      const response = await PostApiCall(
        "http://localhost:8000/api/getReference",
        {
          pdfLink: referenceLink,
          youtube: true,
          article: true,
        }
      );
      console.log("getReference response", response);
      setReference(response);
    } catch (err) {
      console.log("getReference error", err);
    }
  };
  useEffect(() => {
    console.log("referenceLink", referenceLink);
    fetchReferences();
  }, []);
  if (!reference) {
    return (
      <div className="min-h-screen bg-[#D29573]">
        {/* Navbar */}
        <Navbar />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-[#D29573]">
        {/* Navbar */}
        <Navbar />

        {/* Reference Links Section */}
        <div className="max-w-md mx-auto px-4 mt-16">
          {/* Section Header */}
          <div className="flex items-center mb-4">
            {/* Image beside Summary heading */}
            <img
              src="/icons/coffeebean.svg" // Replace with the actual image path
              alt="Summary Icon"
              className="w-7 h-7 mr-2 align-middle" // Adjust the size and alignment of the image
            />
            <span className="text-2xl text-[#5b3d2a] font-bold">
              Reference Links
            </span>
          </div>
          {/* Links */}
          <ul className="space-y-4">
            {reference.youtubeLinks.map((ytThings) => (
              <a
                href={ytThings.link}
                onClick={() => {
                  chrome.tabs.create({
                    url: ytThings.link,
                  });
                }}
                className="flex items-center bg-[#ECBB9B] rounded-lg shadow p-2"
              >
                {/* Icon */}
                <img
                  src="https://banner2.cleanpng.com/20180619/sul/aa6xrbjzf.webp"
                  alt={`${ytThings.title} icon`}
                  className="w-8 h-8 rounded-full mr-3"
                />
                {/* Title with ellipsis */}
                <p className="text-sm font-medium text-gray-700 truncate overflow-hidden whitespace-nowrap">
                  {ytThings.title}
                </p>
              </a>
            ))}
            {reference.articleLinks.map((articleThings) => (
              <a
                href={articleThings.link}
                onClick={() => {
                  chrome.tabs.create({
                    url: articleThings.link,
                  });
                }}
                className="flex items-center bg-[#ECBB9B] rounded-lg shadow p-2"
              >
                {/* Icon */}
                <img
                  src="https://banner2.cleanpng.com/20180413/rfe/avfci721i.webp"
                  alt={`${articleThings.title} icon`}
                  className="w-8 h-8 rounded-full mr-3"
                />
                {/* Title with ellipsis */}
                <p className="text-sm font-medium text-gray-700 truncate overflow-hidden whitespace-nowrap">
                  {articleThings.title}
                </p>
              </a>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default LabLinks;
