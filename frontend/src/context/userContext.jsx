import React, { createContext, useState } from "react";

// Create a Context for the user
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [lecturesChat, setLecturesChat] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedCourse,
        setSelectedCourse,
        selectedLecture,
        setSelectedLecture,
        selectedLectureId,
        setSelectedLectureId,
        lecturesChat,
        setLecturesChat
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
