import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowEvent = ({ match }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const eventId = id;
      try {
        const { data } = await axios.get(`/api/org/get_event/${eventId}`);
        setEvent(data.event);
        setAttendees(data.attendees);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventDetails();
  }, [id]);

  return (
    <div>
      {event && (
        <div className="font-display">
          <h1>{event.title}</h1>
          <h2>Attendees:</h2>
          <ul>
            {attendees.map((attendee, index) => (
              <li key={index}>
                Name: {attendee.name}, Email: {attendee.email}, Payment
                Confirmed: {attendee.payment_confirmed ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowEvent;
