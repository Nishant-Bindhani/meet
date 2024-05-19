import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await axios.get(`/api/org/get_event/${id}`);
        setEvent(data.event);
        setAttendees(data.attendees);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventDetails();
  }, [id]);

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backdropFilter: "blur(10rem)",
      }}
    >
      {event && (
        <div className="flex flex-col rounded-lg bg-gray-100 shadow-lg md:max-w-xl md:flex-row">
          <img
            className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
            alt=""
          />
          <div className="flex flex-col justify-start p-6">
            <h5 className="mb-2 text-xl font-medium text-gray-800">
              {event.title}
            </h5>
            <h6 className="mb-2 text-xl font-medium text-gray-800">
              Attendees:
            </h6>
            <ul>
              {attendees.map((attendee) => (
                <li key={attendee.name}>
                  Name: {attendee.name}, Email: {attendee.email}, Payment
                  Confirmed: {attendee.payment_confirmed ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowEvent;
