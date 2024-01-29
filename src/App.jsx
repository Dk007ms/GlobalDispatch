// App.js
import React, { useState } from "react";
import myImage from "./assets/newslogo.png";
import "./App.css"; // Import your CSS file
import Container from "./components/Container";
import MyContext from "./components/MyContext";
import CountryDropdown from "./components/CountryDropdown";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("Elon Musk");

  function handleSearchSubmit(event) {
    event.preventDefault();
    setSearchValue((prev) => (prev = event.target.value));
  }

  return (
    <MyContext.Provider value={{ searchValue, setSearchValue }}>
      <div>
        <nav className=" bg-yellow-200 relative w-full z-10 p-6 min-h-44 h-max mx-auto flex flex-wrap items-center justify-between">
          {/* Logo and Heading */}
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={myImage}
              alt="News logo"
              className="w-12 h-12 object-contain mr-4"
            />
            <h1 className="text-2xl md:text-3xl font-extrabold text-red-500">
              NewsHub
            </h1>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none  flex justify-center items-center relative"
            >
              <div
                className={`hamburger-icon ${
                  isMobileMenuOpen ? "open" : ""
                } bg-black`}
              ></div>
            </button>
          </div>

          {/* Navigation Buttons - Mobile and Desktop */}
          <div
            className={`${
              isMobileMenuOpen ? "flex" : "hidden"
            } mobile_buttons md:hidden w-full justify-center gap-4 mt-2 transition-all duration-500 ease-in-out `}
          >
            <button className="button-56">Home</button>
            <button className="button-56">Sports</button>
            <button className="button-56">Technology</button>
          </div>

          <div className="hidden md:flex space-x-4 text-white">
            <button className="button-56">Home</button>
            <button className="button-56">Sports</button>
            <button className="button-56">Technology</button>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="md:flex md:flex-wrap flex flex-wrap justify-center items-center mt-4 mx-auto w-11/12 gap-4"
          >
            <CountryDropdown />
            <div className="searchbar flex md:w-8/12">
              <input
                className="searchbar p-2 rounded-l-md focus:shadow-outline text-gray-800 flex-grow mr-2"
                type="text"
                placeholder="Search News"
              />
              <button
                type="button"
                className="search_call border-black bg-white text-blue-900 px-4 py-2 rounded-r-md transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                Search
              </button>
            </div>
          </form>
        </nav>
        <Container />
      </div>
    </MyContext.Provider>
  );
}
