/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: "user", text: "Lorem Ipsum Dorem, Design brain not working", img: "/icons/circle.svg" },
    { sender: "user", text: "HIIII, I AM SOMEONE pls help me with hw", img: "/icons/circle.svg" },
    { sender: "bot", text: "Okay", img: "/icons/logo.svg" },
  ]);

  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { sender: "user", text: input, img: "/icons/circle.svg" },
      ]);
      setInput(""); // Reset input field
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#D29573]">
      {/* Header */}
      <div className="flex items-center justify-center bg-[#D29573] py-4">
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
              className="w-10 h-10 rounded-full shadow-md mx-2"
            />
            {/* Message Bubble */}
            <div
              className={`${
                message.sender === "user" ? "bg-[#ECBB9B]" : "bg-[#DAA17E]"
              } rounded-lg p-3 text-black max-w-xs`}
              style={{ marginLeft: "8px", marginRight: "8px", padding: "10px 16px" }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center bg-[#D29573] p-4">
        <input
          type="text"
          placeholder="Message BeanBot here"
          className="flex-1 rounded-lg px-4 py-4 focus:outline-none 
                      placeholder:text-[#A05854] placeholder:text-sm bg-[#DAA17E]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          style={{
            padding: "12px 20px", // Increase padding for larger field size
            backgroundColor: "#DAA17E", // Change input field's background color
          }}
        />
        <button
          className="ml-2 px-4 py-2 bg-[#A05854] text-white rounded-lg"
          onClick={handleSendMessage}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
