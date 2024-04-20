import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../HomePageComponents/Nav";
import Footer from "../HomePageComponents/Footer";
import jsondata from "../HomePageComponents/dummyevents";
import slugify from "slugify";
import Card from "../HomePageComponents/Card"; // Import the Card component from your project

const EventSearchPage = () => {
  const { slugTitle, slugState } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const search = async () => {
      try {
        console.log("SEARCH RESULT" + slugTitle);
        const filteredEvents = jsondata.filter((event) => {
          console.log(slugify(event.title).toLowerCase());
          return slugTitle && slugState
            ? slugify(event.title).toLowerCase().includes(slugTitle) &&
                slugify(event.state).toLowerCase().includes(slugState)
            : slugify(event.state).toLowerCase().includes(slugState);
        });
        setSearchResults(filteredEvents);
        setSearchTitle(slugTitle.replace(/-/g, " ")); // Replace hyphens with spaces
        // Replace hyphens with spaces
      } catch (error) {
        console.error("Error filtering event data:", error);
      }
    };
    search();
  }, [slugTitle, slugState]);

  return (
    <div className="font-display">
      <Nav />
      <div className="mt-24 ">
        <div className="text-center w-full mt-32">
          {slugTitle ? (
            searchResults.length === 0 ? (
              <h1 className="text-3xl font-medium mb-[-10px]">
                No Results Found for "{searchTitle}" in "{slugState}"
              </h1>
            ) : (
              <h1 className="text-3xl font-medium mb-[-10px] font-bebas">
                Search Results for "{searchTitle}"
              </h1>
            )
          ) : searchResults.length === 0 ? (
            <h1 className="text-3xl font-semibold mb-[-10px] font-bebas">
              Sorry Events in "{slugState}" Not Available Yet.
            </h1>
          ) : (
            <h1 className="text-3xl font-bold mb-[-10px]">
              All The Events Around "{slugState}"
            </h1>
          )}
        </div>
        <div className="inline-flex items-center justify-center w-[80%] ml-28">
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
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-5 px-3 ">
          {searchResults.map((event, index) => (
            <Link to={`/events/${encodeURIComponent(event.title)}`} key={index}>
              <Card
                img={event.img}
                title={event.title}
                host={event.host}
                time={event.time}
                price={event.price}
              />
            </Link>
          ))}
        </div>
      </div>
      <div>
        {searchResults.length === 0 ? (
          <div className="text-center mt-8">
            <h1 className="mb-4 text-6xl font-semibold text-red-500">
              Try Searching Something Else
            </h1>
            <p className="mb-4 text-lg text-gray-600">
              We are one of the best event handlers
            </p>
            <div className="animate-bounce">
              <svg
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventSearchPage;
