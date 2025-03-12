import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );
    if (response.status === 201) {
      const data = response.data;

      setUser(data.user);
      localStorage.setItem('token',data.token)
      navigate("/home");
    }
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] mb-5 w-1/2 rounded px-2 py-2 border text-lg placeholder:text-base"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              type="text"
              placeholder=" First Name"
            />
            <input
              className="bg-[#eeeeee] mb-5 w-1/2 rounded px-2 py-2 border  text-lg placeholder:text-base"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              type="text"
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2 ">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email@example.com"
            required
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="text"
            placeholder="Password"
          />
          <button className="bg-[#111]  text-white font-semibold mb-3 rounded px-2 py-2 border w-full text-lg placeholder:text-base">
            Create account
          </button>
          <p className="text-center ">
            Already have a account?
            <Link to="/login" className="text-blue-600">
              Log in here.
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-xs">
          By proceeding, you consent to get call ,whatsapp and SMS ,Message
          including by automated means , from Uber and Its artifilates to the
          number provided
        </p>
      </div>
    </div>
  );
};

export default Signup;
