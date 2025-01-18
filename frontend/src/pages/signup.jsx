const Signup = () => {
  return (
    <div className="h-[100vh] w-[100%] flex items-center justify-center bg-[#D29573]">
      <div className="w-full max-w-s p-6">
        <div className="flex justify-center mb-4">
          <img
            src="icons/signupimg.svg"
            alt="Coffee Illustration"
            className="w-100px h-100px"
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-[#5a4035] mb-4">
          SIGN UP
        </h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
          />
          <input
            type="text"
            placeholder="Batch"
            className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
          />
          <input
            type="text"
            placeholder="Major"
            className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA17E] bg-[#DAA17E] placeholder:text-[#A05854] placeholder:text-sm"
          />
          <div className="flex justify-center">
          <button
            type="submit"
            className="w-auto px-6 py-2 bg-[#9D6D5B] text-sm text-white py-2 rounded-lg font-bold hover:bg-[#5a4035]"
          >
            SIGN IN
          </button>
          </div>
        </form>
        <p className="text-center text-[#5a4035] mt-3 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-white underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
