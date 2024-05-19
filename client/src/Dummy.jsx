import React from "react";

const Dummy = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backdropFilter: "blur(10rem)",
      }}
    >
      <div className="flex flex-col rounded-lg bg-gray-100 shadow-lg md:max-w-xl md:flex-row">
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
          alt=""
        />
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-2 text-xl font-medium text-gray-800">Card title</h5>
          <p className="mb-4 text-base text-gray-600">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="text-xs text-gray-500">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
  );
};

export default Dummy;
