import React, { useRef, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Nav.css";
import { useAuth } from "../../context/auth";
const Nav = () => {
  const [auth, setAuth] = useAuth();
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [inputState, setinputState] = useState("");
  const [placeholder, setplaceholder] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();

  let Links = [{ name: "Home", link: "/" }];

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        const response = await axios.get(url);
        setAddress(response.data.address);
        setinputState(response.data.address.state);
        setError(null);
      } catch (error) {
        setAddress(null);
        setError(error.message || "Error fetching address");
      }
    })();
  }, [setAddress]);

  const handleFocus = () => {
    if (inputState === address?.state) {
      setinputState("");
      setplaceholder("Enter The State...");
    }
  };

  const handleBlur = () => {
    if (inputState === "") {
      setinputState(address.state);
    }
  };

  const handleChange = (event) => {
    setinputState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create slugs for title and inputState

    const slugTitle = title.toLowerCase();
    const slugState = state.toLowerCase();

    try {
      const response = await axios.get(
        `/api/user/search_event/${slugTitle}/${slugState}`
      );
      // Assuming the response contains the list of events
      const events = response.data.events;

      // Pass events data to the search results page
      navigate(`/search/${slugTitle}/${slugState}`, { state: { events } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    // Reset the search fields
    setTitle("");
    setinputState("");
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      userdata: null,
      token: "",
    });
    localStorage.removeItem("auth"); // delete data
    alert("Logout Successfully");
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50 font-display ">
      <div className="md:flex items-center justify-between bg-slate-800 py-4 md:px-10 px-7 relative">
        <div className="font-extrabold text-4xl flex items-center text-red-50 rounded-xl font-dance ">
          Meet&Greet
        </div>

        <div className="topbarCenter ml-32 relative shadow-2xl">
          <form className="searchForm flex" onSubmit={handleSubmit}>
            <div className="searchBar">
              <CiSearch className="searchIcon" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Search for events..."
                className="searchInput"
              />
            </div>
            <div className="searchBar2">
              <input
                type="text"
                className="searchInput2"
                placeholder={placeholder ? placeholder : "Enter The State..."}
                value={inputState}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-1 bg-red-500 text-white rounded-r-lg hover:bg-red-600"
            >
              <CiSearch className="searchIcon mr-3" />
            </button>
          </form>
        </div>

        <ul className="md:flex md:items-center ">
          {Links.map((l) => (
            <li key={l.name} className="md:ml-8 text-lg ">
              <NavLink
                to={l.link}
                className="text-white hover:text-gray-400 duration-200"
              >
                {l.name}
              </NavLink>
            </li>
          ))}

          <>
            <NavLink
              to="/login"
              className="py-2 pl-6 text-lg text-white hover:text-gray-400 duration-200"
            >
              Log In
            </NavLink>
            <NavLink
              to="/register"
              className="bg-red-500 text-white py-2 px-6 rounded-lg md:ml-8 hover:bg-red-800 duration-500"
            >
              Sign Up
            </NavLink>
          </>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
