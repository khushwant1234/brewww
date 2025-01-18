import Navbar from '../components/Navbar';

const SummaryPage = () => {
  return (
    <div className="min-h-screen bg-[#d9a87e]">
      {/* Navbar */}
      <Navbar />

      {/* Summary Section */}
      <div className="flex justify-center items-start py-10">
        <div className="w-full max-w-4xl bg-[#d9a87e] p-6 rounded-lg">
          <div className="flex items-center mb-4">
            {/* Image beside Summary heading */}
            <img
              src="/icons/coffeebean.svg"  // Replace with the actual image path
              alt="Summary Icon"
              className="w-8 h-8 mr-1 align-middle" // Adjust the size and alignment of the image
            />
            <span className="text-2xl text-[#5b3d2a] font-bold">Summary</span>
          </div>
          <div className="bg-[#e6c3a1] p-6 rounded-lg text-[#5b3d2a] leading-relaxed text-sm">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat
              vehicula sapien, eget tempor arcu mollis suscipit. Suspendisse iaculis
              nisl eget sem lacinia, sit amet ultricies magna accumsan. Ut ac
              pellentesque orci, faucibus condimentum sapien. Vestibulum tincidunt
              ultricies enim, sit amet mattis erat viverra eget. Quisque faucibus
              aliquam augue, eu tincidunt libero auctor ultricies. Nulla facilisi.
              Vestibulum porttitor dapibus risus a scelerisque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
