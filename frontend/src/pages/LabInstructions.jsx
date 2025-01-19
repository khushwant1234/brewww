import Navbar from "../components/Navbar";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { PostApiCall } from "../utils/apiCall";
import Markdown from "react-markdown";

const LabInstructions = () => {
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

  const [reference, setReference] = useState({
    jsonString: "",
  });
  const fetchSummarry = async () => {
    try {
      const response = await PostApiCall(
        "http://localhost:8000/api/geminiCall",
        {
          pdfLink: referenceLink,
          prompt: "Give me Aim, Material Required, observation, conclusion of the experiment ONLY, Only the specified sub headings",
        }
      );
      console.log("fetchSummary response", response);
      setReference(response);
    } catch (err) {
      console.log("fetchSummary error", err);
    }
  };
  useEffect(() => {
    console.log("referenceLink", referenceLink);
    fetchSummarry();
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

        {/* Summary Section */}
        <div className="flex justify-center items-start py-10">
          <div className="w-full max-w-4xl bg-[#D29573] p-6 rounded-lg">
            <div className="flex items-center mb-4">
              {/* Image beside Summary heading */}
              <img
                src="/icons/coffeebean.svg" // Replace with the actual image path
                alt="Summary Icon"
                className="w-8 h-8 mr-1 align-middle" // Adjust the size and alignment of the image
              />
              <span className="text-2xl text-[#5b3d2a] font-bold">Lab Instructions</span>
            </div>
            <div className="bg-[#e6c3a1] p-6 rounded-lg text-[#5b3d2a] leading-relaxed text-sm">
              <Markdown>{reference.jsonString.replace('Observations:', 'Observations:(Not accurate, for reference only)').replace('Observation:', 'Observations:(Not accurate, for reference only)')}</Markdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LabInstructions;
