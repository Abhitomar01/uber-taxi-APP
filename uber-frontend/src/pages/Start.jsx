import React from "react";
import { Link } from "react-router-dom";
const Start = () => {
  return (
    <div>
      <div className="  bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1682834983265-27a10ba5232c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen pt-5  flex justify-between flex-col w-full ">
        <img className="w-16 ml-8" src="/uba-logo2.png" alt="" />
        <div className="bg-white px-4 py-4 pb-7">
          <h2 className="text-3xl font-bold">Get started with Uber</h2>
          <Link to='/login' className=" flex justify-center items-center  w-full bg-black text-white py-3 rounded mt-4">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
