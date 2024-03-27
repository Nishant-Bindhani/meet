import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-40">
      {/* <div className="md:flex md:justify-between md:items-center sm:px-12 bg-[#ffffff19 py-7 ">
        <h1 className="lg:text-4xl text-3cl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-teal-400">Free</span> untill your ready to
          Explore
        </h1>
        <div>
          <input
            type="text"
            placeholder="Enter Your Phno"
            className="text-gray-800 s:w-72 w-full sm:mr-5 mr-1 lg:mb-0 py-2.5 rounded px-2 focus:outline-none "
          />
          <button className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 rounded text-white">
            Request Code
          </button>
        </div>
      </div> */}
      <div className="w-full ">
        <span className="flex justify-center pt-12">
          © 2024 All rights reserved
        </span>
        <span className="flex justify-center pt-2 pb-3">Privacy Policy</span>
        <div className="flex justify-center">
          <div className="h-[0.5px] bg-white w-60 opacity-80"></div>
        </div>
        <span className="flex justify-center pt-2">Connect With Us</span>

        <div className="text-teal-500 flex justify-center pb-4 pt-2 pl-1">
          <span className="p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500 duration-300">
            <FaInstagram />
          </span>
          <span className="p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500 duration-300">
            <FaTwitter />
          </span>
          <span className="p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500 duration-300">
            <FaFacebook />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
