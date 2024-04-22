import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../HomePageComponents/Nav";
import slugify from "slugify";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Footer from "../HomePageComponents/Footer";

const MainEventPage = () => {
  const [auth, setAuth] = useAuth();
  const { title, state, id } = useParams();
  const etitle = decodeURIComponent(title);
  const slugtitle = slugify(etitle).toLowerCase();
  const [searchTitle, setSearchTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [mainEvent, setMainEvent] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { data } = await axios.get(`/api/home/${state}`);
        setEvents(data.events);
        const slug = slugify(etitle).toLowerCase();
        // const response = await axios.get(`/api/v1/events/${slug}`);
        // console.log(response.data); // Assuming the response contains event data
        const filteredEvents = events.filter((event) => {
          return (
            slugify(event.title).toLowerCase() === slugtitle &&
            event.event_id === id
          );
        });
        setSearchTitle(filteredEvents);
        const { otherres } = await axios.get(`/api/get_event/${id}`);
        setMainEvent(otherres);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, []);
  const handleAttendButtonClick = () => {
    if (!auth?.userdata) {
      // If user is not authenticated, store the current location before redirecting to login
      localStorage.setItem("redirectPath", window.location.pathname);
      navigate("/login");
    }
    navigate(
      `/user/pay/${searchTitle[0].title}/${searchTitle[0].price}/${searchTitle[0].event_id}`
    );
  };
  return (
    <div className="bg-slate-100">
      <Nav />
      {console.log(searchTitle[0])}
      {searchTitle && (
        <div className="mt-24 font-display">
          <img
            className="ml-20 h-[30rem] w-[90%] shadow-2xl"
            src={searchTitle[0].img}
            alt="Event"
          />
          <div className="inline-flex items-center justify-center w-[90%] ml-20">
            <hr className="w-full h-1 my-7 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div className="absolute px-4 -translate-x-1/2 bg-slate-200 left-1/2">
              <svg
                className="w-4 h-4 text-gray-700 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mt-2   text-red-800 text-center">
            {etitle}
          </h1>

          <p className="text-gray-700 mt-4  text-center">
            <span className="text-gray-800 font-bold ">Hosted By:</span>
            {searchTitle[0].host}
          </p>
          <p className="text-gray-700 mt-1  text-center">
            <span className=" text-gray-800 font-bold ">Location:</span> {}
            {searchTitle[0].state}
          </p>
          <p className="text-gray-700 mt-1  text-center">
            <span className=" text-gray-800 font-bold text-center">Time:</span>{" "}
            {searchTitle[0].time}
          </p>
          <p className="text-gray-700 mt-1  text-center">
            <span className=" text-gray-800 font-bold">Price:</span>{" "}
            {searchTitle[0].price}
          </p>

          <div className="my-4 text-center w-[90%] ml-14">
            <h1 className=" text-slate-700 font-semibold text-2xl mt-12 my-4 text-center ml-14">
              Details
            </h1>

            <p className="text-gray-800 ml-12">{searchTitle[0].description}</p>
          </div>
          <div className="mb-[-7rem]  mt-12 flex justify-center">
            <button
              className=" bg-red-600 hover:bg-red-800 text-white  py-2 px-8 mr-4 rounded-lg hover:scale-110 duration-1000"
              onClick={handleAttendButtonClick}
            >
              Attend
            </button>

            <button className="bg-green-700 hover:bg-green-900 text-white rounded-lg py-2 px-8 hover:scale-110 duration-1000">
              View on Map
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MainEventPage;
