// eslint-disable-next-line no-unused-vars
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchquery = urlParams.toString();
    navigate(`/search?${searchquery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchquery = urlParams.get("searchTerm");
    if (searchquery) {
      setSearchTerm(searchquery);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Harsh</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none border-none px-1 w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" onClick={handleSubmit} />
        </form>

        <ul className="flex gap-4">
          <li className="hidden sm:inline text-slate-700 hover:text-slate-500 hover:underline cursor-pointer">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:text-slate-500 hover:underline cursor-pointer">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="text-slate-700 hover:text-slate-500 hover:underline cursor-pointer">
            <Link to={currentUser ? "/profile" : "/sign-in"}>
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-7 h-7 rounded-full"
                />
              ) : (
                <span>Sign In</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
