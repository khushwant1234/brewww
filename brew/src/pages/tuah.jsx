import React from "react";
import { useNavigate } from "react-router-dom";

const tuah = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[300px] w-[200px] bg-white">
      <button
        onClick={() => navigate("/")}
        className="h-[50px] w-[100px] bg-black text-white"
      >
        Click Me!
      </button>
    </div>
  );
};

export default tuah;
