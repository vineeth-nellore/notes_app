export const Navbar = () => {
  return (
    <header className="flex px-5 py-2 gap-3 border-b-2 border-gray-100 align-items-center justify-content-center items-center">
      <div className="w-12 h-12">
        <img
          className="w-full h-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhO7c293mZ_v1s4rFLkUQGzwuI558PplB7g&s"
          alt="logo"
        />
      </div>
      <h1 className="text-indigo-800 text-4xl font-bold">Write Your Notes</h1>
    </header>
  );
};
