import React, { createContext, useState } from "react";

// Create a Context for the user
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [SelectedTutorial, setSelectedTutorial] = useState(null);
  const [selectedlab, setSelectedlab] = useState(null);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [lecturesChat, setLecturesChat] = useState([]);
  const [referenceLink, setReferenceLink] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedCourse,
        setSelectedCourse,
        selectedLecture,
        setSelectedLecture,
        SelectedTutorial,
        setSelectedTutorial,
        selectedlab,
        setSelectedlab,
        selectedLectureId,
        setSelectedLectureId,
        lecturesChat,
        setLecturesChat,
        referenceLink,
        setReferenceLink,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
