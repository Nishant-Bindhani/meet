import React, { useRef, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import slugify from "slugify"; // Import slugify for creating slugs
import "./Nav.css";
import { useAuth } from "../../context/auth";
const OrgNav = () => {
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

  let Links = [{ name: "Home", link: "/org/home" }];

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create slugs for title and inputState
    const slugTitle = slugify(title, { lower: true });
    const slugState = slugify(inputState, { lower: true });
    // Navigate to a different page with the slugs in the URL
    navigate(`/user/events/${slugTitle}/${slugState}`);
    // Reset the search fields
    setTitle("");
    setinputState("");
  };

  const handleLogout = async () => {
    const { res } = await axios.get(`/api/logout/${auth.userdata.email}`);
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth"); // delete data
    alert("Logout Successfully");
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50 font-display">
      <div className="md:flex items-center justify-between bg-slate-800 py-4 md:px-10 px-7 relative">
        <div className="font-extrabold text-4xl flex items-center text-red-50 rounded-xl font-dance ">
          Meet&Greet
        </div>

        <div className="topbarCenter ml-32 relative shadow-2xl"></div>

        <ul className="md:flex md:items-center ">
          {Links.map((l) => (
            <li key={l.name} className="md:ml-8 text-lg ">
              <NavLink
                to={l.link}
                className="py-2 pl-6 text-lg text-white hover:text-gray-400 duration-200"
              >
                {l.name}
              </NavLink>
            </li>
          ))}
          {!auth.userdata ? (
            <>
              <NavLink
                to="/register"
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
          ) : (
            <>
              {" "}
              <div className="pl-14">
                <img
                  ref={imgRef}
                  onClick={() => setOpen(!open)}
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="user"
                  className="h-14 w-14 object-cover border-4 border-gray-400 rounded-full cursor-pointer"
                />
                {open && (
                  <div
                    ref={menuRef}
                    className="absolute bg-gray-100 p-4 w-48 right-0.5 rounded"
                  >
                    <ul>
                      <Link to="/org/create-form">
                        <li className="p-2 cursor-pointer rounded hover:bg-gray-200">
                          Create New Event
                        </li>
                      </Link>

                      <Link to="/org/update-org">
                        <li className="p-2 cursor-pointer rounded hover:bg-gray-200">
                          Profile Settings
                        </li>
                      </Link>

                      <NavLink onClick={handleLogout} to="/org-login">
                        <li className="p-2 cursor-pointer rounded hover:bg-gray-200">
                          LogOut
                        </li>
                      </NavLink>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrgNav;
