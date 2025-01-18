/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { PostApiCall } from "../utils/apiCall";
import { setItem } from "../utils/storage";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignedup, setIsSignedup] = useState(false);
  const navigete = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    batch: "",
    branch: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Generate batch options
  const batchOptions = ["24", "25", "26", "27"];

  const branchOptions = ["CSE", "ECE", "BioTech"];

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!signupForm.batch || !signupForm.branch) {
      toast.error("Please select both batch and branch");
      return;
    }
    console.log("Signup Form Data:", signupForm);
    const data = await PostApiCall(
      "http://localhost:8000/api/auth/signup",
      signupForm
    );
    console.log("Signup Response:", data);
    if (data.success) {
      setItem("token", data.data.token);
      toast.success("Signup Successful");
      navigete("/home");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Form Data:", loginForm);

    // Redirect to home page
    const data = await PostApiCall(
      "http://localhost:8000/api/auth/login",
      loginForm
    );
    console.log("Login Response:", data);
    if (data.success) {
      setItem("token", data.data.token);
      toast.success("Login Successful");
      navigete("/home");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#D29573]">
      <div className="w-full max-w-s p-6">
        <div className="flex justify-center mb-4">
          <img
            src={isSignup ? "icons/signupimg.svg" : "icons/loginimg.svg"}
            alt="Coffee Illustration"
            className="w-100px h-100px"
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-[#5a4035] mb-4">
          {isSignup ? "SIGN UP" : "LOGIN"}
        </h1>
        <form
          className="space-y-4"
          onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit}
        >
          {isSignup ? (
            <>
              <input
                type="text"
                name="name"
                value={signupForm.name}
                onChange={handleSignupChange}
                placeholder="Full Name"
                className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
              />
              <select
                name="batch"
                value={signupForm.batch}
                onChange={handleSignupChange}
                className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
              >
                <option value="">Select Batch</option>
                {batchOptions.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
              <select
                name="branch"
                value={signupForm.branch}
                onChange={handleSignupChange}
                className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
              >
                <option value="">Select Branch</option>
                {branchOptions.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
              <input
                type="email"
                name="email"
                value={signupForm.email}
                onChange={handleSignupChange}
                placeholder="Email"
                className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
              />
              <input
                type="password"
                name="password"
                value={signupForm.password}
                onChange={handleSignupChange}
                placeholder="Password"
                className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
              />
            </>
          ) : (
            <>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="Email"
                className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
              />
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
              />
            </>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-auto px-6 py-2 bg-[#9D6D5B] text-sm text-white py-2 rounded-lg font-bold hover:bg-[#5a4035]"
            >
              {isSignup ? "SIGN UP" : "LOGIN"}
            </button>
          </div>
        </form>
        <p className="text-center text-[#5a4035] mt-3 text-sm">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button onClick={toggleForm} className="text-white underline">
                Log In
              </button>
            </>
          ) : (
            <>
              Haven&apos;t signed up yet?{" "}
              <button onClick={toggleForm} className="text-white underline">
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );

  // return (
  //   <div className="flex justify-center items-center w-[400px] h-[600px] bg-gradient-to-t from-[#141e30] to-[#243b55]">
  //     <div className="w-full h-full overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] shadow-2xl">
  //       <form
  //         onSubmit={handleSignupSubmit}
  //         className={`relative w-full h-full transition-transform duration-800 ease-in-out ${
  //           isSignup ? "translate-y-0" : ""
  //         }`}
  //       >
  //         <h1
  //           onClick={toggleForm}
  //           className="text-white text-3xl flex justify-center mt-8 mb-6 font-bold cursor-pointer transition-transform duration-500 ease-in-out hover:scale-110"
  //         >
  //           Signup
  //         </h1>
  //         <input
  //           type="text"
  //           name="name"
  //           value={signupForm.name}
  //           onChange={handleSignupChange}
  //           placeholder="Name"
  //           className="w-[250px] h-10 bg-gray-100 mx-auto block px-4 rounded-lg mb-4 border border-gray-300 outline-none focus:shadow-md focus:border-[#573b8a] transition-shadow duration-300 text-sm"
  //           required={true}
  //         />
  //         <input
  //           type="email"
  //           name="email"
  //           value={signupForm.email}
  //           onChange={handleSignupChange}
  //           placeholder="Email"
  //           className="w-[250px] h-10 bg-gray-100 mx-auto block px-4 rounded-lg mb-4 border border-gray-300 outline-none focus:shadow-md focus:border-[#573b8a] transition-shadow duration-300 text-sm"
  //           required={true}
  //         />
  //         <select
  //           name="batch"
  //           value={signupForm.batch}
  //           onChange={handleSignupChange}
  //           className="w-[250px] h-10 bg-gray-100 mx-auto block px-4 rounded-lg mb-4 border border-gray-300 outline-none focus:shadow-md focus:border-[#573b8a] transition-shadow duration-300 text-sm appearance-none cursor-pointer"
  //           required={true}
  //         >
  //           <option value="">Select Batch</option>
  //           {batchOptions.map((batch) => (
  //             <option key={batch} value={batch}>
  //               {batch}
  //             </option>
  //           ))}
  //         </select>
  //         <select
  //           name="branch"
  //           value={signupForm.branch}
  //           onChange={handleSignupChange}
  //           className="w-[250px] h-10 bg-gray-100 mx-auto block px-4 rounded-lg mb-4 border border-gray-300 outline-none focus:shadow-md focus:border-[#573b8a] transition-shadow duration-300 text-sm appearance-none cursor-pointer"
  //           required={true}
  //         >
  //           <option value="">Select Branch</option>
  //           {branchOptions.map((branch) => (
  //             <option key={branch} value={branch}>
  //               {branch}
  //             </option>
  //           ))}
  //         </select>
  //         <input
  //           type="password"
  //           name="password"
  //           value={signupForm.password}
  //           onChange={handleSignupChange}
  //           placeholder="Password"
  //           className="w-[250px] h-10 bg-gray-100 mx-auto block px-4 rounded-lg mb-4 border border-gray-300 outline-none focus:shadow-md focus:border-[#573b8a] transition-shadow duration-300 text-sm"
  //           required={true}
  //         />
  //         <button
  //           type="submit"
  //           className="w-[250px] h-10 mx-auto block text-white bg-[#573b8a] text-sm font-bold mt-4 rounded-lg transition-colors duration-200 hover:bg-[#6d44b8] cursor-pointer"
  //         >
  //           Signup
  //         </button>
  //       </form>
  //       <form
  //         onSubmit={handleLoginSubmit}
  //         className={`relative w-full h-[420px] bg-gray-100 rounded-[60%/10%] transition-transform duration-800 ease-in-out ${
  //           !isSignup ? "-translate-y-[450px]" : "-translate-y-[140px]"
  //         }`}
  //       >
  //         <h1
  //           onClick={toggleForm}
  //           className="text-[#573b8a] text-3xl flex justify-center mt-8 mb-6 font-bold cursor-pointer transition-transform duration-500 ease-in-out hover:scale-110"
  //           required={true}
  //         >
  //           Login
  //         </h1>
  //         <input
  //           type="email"
  //           name="email"
  //           value={loginForm.email}
  //           onChange={handleLoginChange}
  //           placeholder="email"
  //           className="w-[250px] h-10 bg-gray-100 mx-auto block px-4 rounded-lg mb-4 border border-gray-300 outline-none focus:shadow-md focus:border-[#573b8a] transition-shadow duration-300 text-sm"
  //           required={true}
  //         />
  //         <input
  //           type="password"
  //           name="password"
  //           value={loginForm.password}
  //           onChange={handleLoginChange}
  //           placeholder="Password"
  //           className="w-[250px] h-10 bg-gray-100 mx-auto block px-4 rounded-lg mb-4 border border-gray-300 outline-none focus:shadow-md focus:border-[#573b8a] transition-shadow duration-300 text-sm"
  //           required={true}
  //         />
  //         <button
  //           type="submit"
  //           className="w-[250px] h-10 mx-auto block text-white bg-[#573b8a] text-sm font-bold mt-4 rounded-lg transition-colors duration-200 hover:bg-[#6d44b8] cursor-pointer"
  //           required={true}
  //         >
  //           Login
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default Auth;
