import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const user = auth.userdata;
    if (user) {
      setName(user.name);
      setState(user.state);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = auth.userdata.email;
      const res = await axios.post(`/api/user/update_user/${email}`, {
        name,
        password,
        state,
      });
      if (res && res.data.success) {
        alert("Profile Updated Successfully");
        navigate("/user");
      } else {
        alert("Failed to Update");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      let answer = confirm(`Are You Sure want to delete this Your Account ?`); //For preventing accidental deletion
      if (!answer) return;
      const email = auth.userdata.email;
      const res = await axios.delete(`/api/user/delete_user/${email}`);
      if (res && res.data.success) {
        alert("Account Deleted Successfully");
        navigate("/login");
      } else {
        alert("Failed to delete account");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete account");
    }
  };
  return (
    <div
      className="w-full h-screen flex items-start font-display "
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",

        backdropFilter: "blur(10rem)",
      }}
    >
      <div className="w-1/2 h-[80%] max-w-[500px] mx-auto bg-[#f5f5f5] flex flex-col p-16 justify-evenly items-center mt-24">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-4 text-center font-bebas">
              Profile Settings
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full py-2 my-2 bg-transparent text-black border-b border-black outline-none focus:outline-none"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full py-2 my-2 bg-transparent text-black border-b border-black outline-none focus:outline-none"
                required
              />
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter Your State"
                className="w-full py-2 my-2 bg-transparent text-black border-b border-black outline-none focus:outline-none"
                required
              />
            </div>
            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full text-white my-2  bg-green-800 rounded-md p-4 text-center flex items-center justify-center hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full text-white my-2  bg-red-800 rounded-md p-4 text-center flex items-center justify-center hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
