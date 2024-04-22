import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"; // Import custom CSS for DatePicker
import OrgNav from "../HomePageComponents/OrgNav";
import Footer from "../HomePageComponents/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEventForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error1, setError1] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescrption] = useState("");
  const navigate = useNavigate();

  const handleStartDateChange = (date) => {
    if (endDate && date > endDate) {
      setError1("Start date must be before or equal to the end date.");
      setStartDate(endDate);
    } else {
      setStartDate(date);
      setError1("");
    }
  };

  const handleEndDateChange = (date) => {
    if (startDate && date < startDate) {
      setError1("End date must be after or equal to the start date.");
      setEndDate(startDate);
    } else {
      setEndDate(date);
      setError1("");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Generate event ID
      const eventData = new FormData();
      eventData.append("name", name);
      eventData.append("email", email);
      eventData.append("title", title);
      eventData.append("image", await convertBase64(image));
      eventData.append("startDate", startDate);
      eventData.append("endDate", endDate);
      eventData.append("state", state);
      eventData.append("location", location);
      eventData.append("price", price);
      eventData.append("description", description);

      const { data } = await axios.post(
        `/api/org/create_event`, // Send event ID as a parameter
        eventData
      );
      if (data?.success) {
        console.log(data?.message);
        navigate("/org/home");
      } else {
        console.log(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <OrgNav />
      <div className="min-h-screen flex justify-center items-center font-display">
        <div className="bg-white p-8 rounded-lg  w-3/4 mt-24">
          <h1 className="text-4xl text-red-600  font-semibold  mb-12 text-center">
            Create New Event
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Host Name
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="appearance-none bg-gray-200 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter Host Name"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Host Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="appearance-none bg-gray-200 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Host Email"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Event Title
              </label>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="appearance-none bg-gray-200 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter Title"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="startDate"
              >
                Starting Date & Time
              </label>
              <div>
                <DatePicker
                  selected={startDate}
                  value={startDate}
                  onChange={handleStartDateChange}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={new Date()}
                  placeholderText={"Please Select The Starting Date And Time"}
                  className="appearance-none bg-gray-200 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Custom class to set width to full
                />
              </div>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="endDate"
              >
                Ending Date & Time
              </label>
              <DatePicker
                selected={endDate}
                value={endDate}
                onChange={handleEndDateChange}
                showTimeSelect
                placeholderText={"Please Select The Ending Date And Time"}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className="appearance-none bg-gray-200 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Custom class to set width to full
              />
              {error1 && <div style={{ color: "red" }}>{error1}</div>}
            </div>
            <div>
              <label
                className=" text-gray-700 text-sm font-bold mb-2 pl-1"
                htmlFor="images"
              >
                Upload Images
              </label>
              <input
                name="image"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                className="appearance-none  border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="images"
                type="file"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                className="appearance-none border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                type="text"
                placeholder="Enter Your State"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Event Location
              </label>
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                className="appearance-none border rounded bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                placeholder="Enter Your Location"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price (INR)
              </label>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="appearance-none border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Enter price , Enter 0 If Free"
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                onChange={(e) => {
                  setDescrption(e.target.value);
                }}
                value={description}
                className="appearance-none bg-gray-200 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                rows="6"
                placeholder="Enter description"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleCreate}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Create Event
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEventForm;
