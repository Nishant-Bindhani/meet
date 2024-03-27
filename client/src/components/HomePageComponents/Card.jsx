import React from "react";
import { SlCalender } from "react-icons/sl";
import { IoTicketOutline } from "react-icons/io5";
const Card = (props) => {
  return (
    <div className="shadow-2xl rounded-md  hover:scale-105 duration-200">
      <div className="overflow-hidden">
        <img src={props.img} className="hover:scale-125 duration-1000" />
      </div>
      <h1 className="py-2 px-3 text-xl font-semibold hover:underline">
        {props.title}
      </h1>
      <p className="pb-4 px-3 text-gray-600 font-medium">{props.host}</p>
      <p className="pt-0 px-3 flex items-center">
        <SlCalender />
        <span className="px-2">{props.time}</span>
      </p>
      <p className="pb-2 px-3 flex items-center">
        <IoTicketOutline />
        <span className="px-1">{props.price}</span>
      </p>
    </div>
  );
};

export default Card;
