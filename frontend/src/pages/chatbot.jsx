/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Markdown from "react-markdown";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const {
    user,
    selectedCourse,
    setSelectedLecture,
    setSelectedLectureId,
    selectedLectureId,
    setLecturesChat,
    lecturesChat,
  } = useContext(UserContext);

  useEffect(() => {
    // Add welcome message when component mounts
    setMessages([
      {
        sender: "bot",
        text: "Hi! I am Bean Bot, Here to help you on your learning journey. Feel free to ask questions from the notes you have selected.",
        img: "icons/logo.svg",
      },
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      sender: "user",
      text: input,
      img: "icons/coffeebean.svg", // Update with real avatar path
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Get conversation history excluding welcome message
      const conversationHistory = messages
        .slice(1) // Skip welcome message
        .map((msg) => `${msg.sender}: ${msg.text}`)
        .join("\n");

      // Make API call with context
      const response = await axios.post("http://localhost:8000/api/ask", {
        links: lecturesChat,
        question: input,
        context: conversationHistory
      });

      // Add bot response
      const botMessage = {
        sender: "bot",
        text: response.data.answer,
        img: "icons/logo.svg", // Update with real avatar path
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I encountered an error. Please try again.",
        img: "icons/logo.svg",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-[#D29573]">
      {/* Header */}
      <div className="p-4 bg-[#D29573] text-black relative">
        <div className="flex items-center space-x-2">
          <ArrowLeft
            className="text-black hover:text-white cursor-pointer transition-colors"
            size={20}
            onClick={() => navigate("/lecture")}
          />
          <h2 className="text-md font-semibold m-0">Notes</h2>
        </div>
        <h1 className="text-xl font-bold text-brown-700 flex items-center">
          <span className="mr-2">☕</span> BeanBot
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "flex-row" : "flex-row-reverse"
            } items-start mb-4`}
          >
            {/* Avatar */}
            <img
              src={message.img} // Dynamically assign image based on sender
              alt={`${message.sender} avatar`}
              className="w-10 h-10 mx-2"
            />
            {/* Message Bubble */}
            <div
              className={`${
                message.sender === "user" ? "bg-[#ECBB9B]" : "bg-[#DAA17E]"
              } rounded-lg p-3 text-black max-w-xs`}
              style={{
                marginLeft: "8px",
                marginRight: "8px",
                padding: "10px 16px",
              }}
            >
              <Markdown>{message.text}</Markdown>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-[#D29573] p-4"
      >
        <input
          type="text"
          placeholder="Message BeanBot here"
          className="flex-1 px-4 py-4 focus:outline-none 
                      placeholder:text-[#A05854] placeholder:text-sm bg-[#DAA17E]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "12px 20px", // Increase padding for larger field size
            backgroundColor: "#DAA17E", // Change input field's background color
          }}
        />
        <button
          type="submit"
          className="ml-2 bg-[#A05854] text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotPage;
