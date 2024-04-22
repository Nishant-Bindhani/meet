import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
        organizer: false,
      });
      if (res && res.data.success && !res.data.organizer) {
        alert(res.data.message);
        setAuth({
          ...auth,
          userdata: res.data.userdata,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        // Check for redirectPath in localStorage
        const redirectPath = localStorage.getItem("redirectPath");
        if (redirectPath) {
          // If redirectPath exists, navigate to it
          navigate(redirectPath);
          // Remove redirectPath from localStorage
          localStorage.removeItem("redirectPath");
        } else {
          // If redirectPath does not exist, navigate to /user
          navigate("/user/home");
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Email Not registered");
    }
  };

  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-screen flex items-start font-display">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col bg-white py-5 px-10 mr-14">
          <div className="font-extrabold text-4xl cursor-pointer flex items-center text-red-700 font-dance ">
            Meet&Greet
          </div>
          <p className="text-2xl text-gray-600 mt-2 font-bebas">
            Join us for attending the most amazing events around the country
          </p>
        </div>
        <img
          src="https://images.pexels.com/photos/1613240/pexels-photo-1613240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full h-full object-cover"
          alt="Login Background"
        />
      </div>
      <div className="absolute right-10 top-10">
        <button
          type="button"
          onClick={handleNavigateHome}
          className="rounded-md p-2   inline-flex items-center justify-center text-red-700  hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-inset"
        >
          <span className="sr-only">Close menu</span>

          <svg
            className="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="w-1/2 h-full max-w-[500px] mx-auto bg-[#f5f5f5] flex flex-col p-16 justify-evenly items-center">
        <div className="w-full flex flex-col ">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-4">Login</h3>
            <p className="text-base mb-2">
              Welcome Back! Please Enter Your Details
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                className="w-full py-2 my-2 bg-transparent text-black border-b border-black outline-none focus:outline-none"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                className="w-full py-2 my-2 bg-transparent text-black border-b border-black outline-none focus:outline-none"
                required
              />
            </div>

            <div className="w-full flex items-center justify-end pt-1"></div>
            <div className="w-full flex flex-col my-4">
              <button className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center hover:opacity-80">
                Log in
              </button>

              <div className="w-full flex items-center justify-center">
                <p className="text-sm font-normal text-[#060606]">
                  Don't Have an account ?{" "}
                  <Link
                    to="/register"
                    className="font-semibold underline underline-offset-2 cursor-pointer hover:opacity-70"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
              <div className="w-full flex items-center justify-center py-3">
                <p className="text-sm font-bold text-red-600">
                  Log in as an Organiser:{" "}
                  <Link
                    to="/org-login"
                    className="font-semibold underline underline-offset-2 cursor-pointer hover:opacity-70 text-black"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
