import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/signup", {
        name,
        email,
        password,
        state,
        answer,
        organizer: false,
      });
      if (res && res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Email ");
    }
  };
  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex items-start font-display">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col bg-white py-5 px-10 mr-14">
          <h1 className="text-4xl text-black font-bold my-4">MEET&GREET</h1>
          <p className="text-xl text-black font-normal">
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
            <h3 className="text-3xl font-semibold mb-4 text-center">
              Register
            </h3>
            <p className="text-base mb-2 text-center">
              Hey Wanderer ! Register Yourself To Explore A Full Pack Of Awesome
              Events
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Your Name"
                className="w-full py-2 my-2 bg-transparent text-black border-b border-black outline-none focus:outline-none"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Your Email"
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
              <input
                type="text"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                placeholder="Enter Your State"
                className="w-full py-2 my-2 bg-transparent text-black border-b border-black outline-none focus:outline-none"
                required
              />
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                placeholder="Enter your Location"
                className="w-full py-2 my-2 bg-transparent text-black border-b border-black outline-none focus:outline-none"
                required
              />
            </div>

            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
              >
                Register
              </button>
              <div className="w-full flex items-center justify-center">
                <p className="text-sm font-bold text-red-600">
                  Register as an Organiser:{" "}
                  <Link
                    to="/org-register"
                    className="font-semibold underline underline-offset-2 cursor-pointer hover:opacity-70 text-black"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
              <div className="w-full flex items-center justify-center py-3">
                <p className="text-sm font-normal text-[#060606]">
                  Already a User ?{" "}
                  <Link
                    to="/login"
                    className="font-semibold underline underline-offset-2 cursor-pointer hover:opacity-70"
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

export default Register;
