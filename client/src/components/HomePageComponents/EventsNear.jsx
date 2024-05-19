import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

const EventsNear = () => {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [auth, setAuth] = useAuth();

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

        setError(null); // Reset error state if location access is successful
      } catch (error) {
        setAddress(null); // Reset address state if there's an error
        setError(error.message || "Error fetching address");
      }
    })();
  }, []);

  useEffect(() => {
    if (address && address.state) {
      const fetchEvents = async () => {
        try {
          const { data } = await axios.get(`/api/home/${address.state}`);
          setEvents(data.events_near_me);
        } catch (error) {
          console.error(error);
        }
      };

      fetchEvents();
    }
  }, [address]);

  if (!address && error) {
    return (
      <div className="">
        <h1 className="text-2xl pt-4 line-w tracking-tight font-semibold text-center">
          For More Personalised Search
        </h1>
        <p className="text-md pb-3 line-w tracking-tight font-normal text-center">
          Enable Your Location Access And Refresh The Page
        </p>
      </div>
    );
  }

  return (
    <div className="font-display">
      {address && address.state && (
        <div className="mt-32">
          <div className="max-w-[1320px] mx-auto">
            <h1 className="pt-4 line-w font-medium text-3xl font-bebas tracking-tight text-center">
              Events Near Your Location:{" "}
              <span className="bg-slate-800 rounded-3xl py-2 px-3 text-gray-300 text-3xl">
                {address.state}
              </span>
            </h1>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
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
            {events &&
              events.map((e) => (
                <Link
                  to={
                    auth.userdata
                      ? `/user/events/${encodeURIComponent(e.title)}/${
                          e.state
                        }/${e.event_id}`
                      : auth.userdata && auth.userdata.organizer
                      ? `/org/events/${encodeURIComponent(e.title)}/${
                          e.state
                        }/${e.event_id}`
                      : `/events/${encodeURIComponent(e.title)}/${e.state}${
                          e.event_id
                        }`
                  }
                  key={e.event_id}
                >
                  <Card
                    img={e.img}
                    title={e.title}
                    host={e.host}
                    time={e.time}
                    price={e.price}
                  />
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsNear;
