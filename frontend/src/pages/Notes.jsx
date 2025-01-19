import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostApiCall, PutApiCall } from "../utils/apiCall";
import { UserContext } from "../context/userContext";
import { ArrowLeft } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { toast } from "react-toastify";
import { removeItem } from "../utils/storage";

const Notes = () => {
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [requestType, setRequestType] = useState("put");

  const { user, selectedLecture } = useContext(UserContext);

  const fetchNotes = async () => {
    try {
      const response = await PostApiCall(
        "http://localhost:8000/api/note/getNotes",
        {
          lectureID: selectedLecture._id,
          userID: user._id,
        }
      );
      setNotes(response.data);
      console.log("getNotes response", response);
      console.log(response.data.note.length);
      if (response.data.note.length === 0) {
        setRequestType("post");
      } else {
        setNotes(response.data.note[0].notes);
      }
    } catch (err) {
      console.log("getNotes error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNotes = async () => {
    const noteContent = notes;
    if (requestType === "put") {
      try {
        setLoading(true);

        const response = await PutApiCall("http://localhost:8000/api/note", {
          notess: noteContent,
          lectureID: selectedLecture._id,
          userID: user._id,
        });

        if (response.success) {
          // Update local state with new notes
          setNotes(noteContent);
          // You might want to show a success message here
          toast.success("Notes updated successfully");
        } else {
          toast.error("Failed to update notes");
        }
      } catch (err) {
        console.error("Update notes error:", err);
        toast.error("Error updating notes");
      } finally {
        setLoading(false);
      }
    }
    if (requestType === "post") {
      try {
        setLoading(true);

        const response = await PostApiCall("http://localhost:8000/api/note", {
          notess: noteContent,
          lectureID: selectedLecture._id,
          userID: user._id,
        });

        if (response.success) {
          // Update local state with new notes
          setNotes(noteContent);
          // You might want to show a success message here
          toast.success("Notes created successfully");
        } else {
          toast.error("Failed to create notes");
        }
      } catch (err) {
        console.error("Create notes error:", err);
        toast.error("Error creating notes");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!selectedLecture) {
      navigate("/lecture");
    }
    fetchNotes();
  }, []);

  const handleLogout = async () => {
    // Clear user data from context
    // setUser(null);
    // Clear any stored tokens or session data

    removeItem("token"); // Adjust based on your authentication setup
    // Navigate to login page
    navigate("/");
  };

  // const handleResponseChange = (e) => {

  // };

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
                onClick={() => navigate("/lecture")}
              />
              <h1 className="text-md text-black font-medium text-antique-white m-0">
                Notes
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-black hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          </div>
          {/* Header End */}

          {/* Lecture List Skeleton */}
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#9D6D5B] h-[40px] rounded-lg">
              <SkeletonTheme baseColor="#9D6D5B" highlightColor="#7D4448">
                <div className="flex w-full h-full justify-between items-center">
                  <div className="h-[100%] w-[100%]">
                    <Skeleton height="100vh" className="rounded-lg" />
                  </div>
                </div>
              </SkeletonTheme>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* Header Start */}
      <div className="p-4 bg-[#D29573] text-black relative">
        <div className="flex items-center space-x-2">
          <ArrowLeft
            className="text-black hover:text-white cursor-pointer transition-colors"
            size={20}
            onClick={() => navigate("/lecture")}
          />
          <h2 className="text-md font-semibold m-0">Notes</h2>
        </div>
        <button
          onClick={handleUpdateNotes}
          className="absolute top-2 right-4 bg-[#A05854] text-black hover:text-white rounded-md hover:bg-[#9F5654] transition my-2 px-4 py-0"
          style={{
            fontSize: "12px",
            width: "60px",
            height: "25px",
            lineHeight: "25px",
          }}
        >
          Save
        </button>
      </div>
      {/* Header End */}
      {/* Text Editor Start */}
      <ReactQuill theme="snow" value={notes} onChange={setNotes} />
      {/* Text Editor End */}
    </div>
  );
};

export default Notes;
