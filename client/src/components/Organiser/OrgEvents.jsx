import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../HomePageComponents/Card";

const OrgEvents = () => {
  const [auth, setAuth] = useAuth();
  const [events, setEvents] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(
          `/api/org/org_home/${auth.userdata.email}`
        );
        setEvents(data.events);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleUpdateEvent = (eventId) => {
    // Redirect to update page with event id as a parameter
    window.location = `/org/update-event/${eventId}`;
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await axios.get(`/api/org/delete_event/${eventId}`);
      if (response.data) {
        // If the event is successfully deleted, remove it from the events list
        setEvents(events.filter((event) => event.id !== eventId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-32 font-display">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-4xl pt-4 line-w font-medium text-center font-bebas tracking-tight">
          Hosted Events
        </h1>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-1 my-7 bg-gray-200 border-0 rounded dark:bg-gray-700" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
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
      </div>
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-5 px-3 py-4">
        {events.map((e) => (
          <div
            key={e.event_id}
            className="relative"
            onMouseEnter={() => setHoveredCard(e.event_id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Link to={`/org/show-event/${e.event_id}`}>
              <Card
                img={e.img}
                title={e.title}
                host={e.host}
                time={e.time}
                price={e.price}
              />
            </Link>
            {hoveredCard === e.event_id && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-60 backdrop-blur-lg">
                <button
                  onClick={() => handleUpdateEvent(e.event_id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteEvent(e.event_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                >
                  Delete
                </button>
                <Link to={`/org/show-event/${e.event_id}`}>
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Show Event
                  </button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgEvents;
