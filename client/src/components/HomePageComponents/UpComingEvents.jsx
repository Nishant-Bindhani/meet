import Card from "./Card.jsx";
import jsondata from "./dummyevents.js";
import { Link } from "react-router-dom";

const UpComingEvents = () => {
  return (
    <div className="mt-32 font-display">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-3xl pt-4 line-w tracking-tight font-semibold text-center">
          Upcoming Events
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
        {jsondata.map((e) => (
          <Link to="/" key={e.id}>
            {/* Key prop moved to Card */}
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
  );
};

export default UpComingEvents;
