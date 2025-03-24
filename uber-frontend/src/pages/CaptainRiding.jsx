import React from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { useRef } from "react";
import FinsihRide from "../components/FinsihRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  const [finishRidePanel, setFinsihRidePanel] = useState(false);
  const finsihRidePanelRef = useRef(null);
  console.log(rideData);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finsihRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finsihRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className=" text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-[90%] relative z-[-1]">
        <LiveTracking/>
      </div>
      <div
        className="h-1/5 flex items-center justify-between relative bg-yellow-200 p-6"
        onClick={() => {
          setFinsihRidePanel(true);
        }}
      >
        <h5
          onClick={() => {}}
          className="p-1 text-center absolute top-0 w-[95%]"
        >
          <i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finsihRidePanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        <FinsihRide
        ride={rideData}
        setFinsihRidePanel={setFinsihRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
