import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FinsihRide = (props) => {
  const navigate = useNavigate();
  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
          rideId: props.ride._id,
        
      }, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Correct placement
      }
    })

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }

  return (
    <div>
      <h5
        onClick={() => {
          props.setFinsihRidePanel(false);
        }}
        className="p-2 text-center absolute top-0 w-[93%]"
      >
        <i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5"> Finish this Ride</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4">
        <div className="flex items-center gap-3 mt-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUueKMdnTNO_ItCNq3y606v5XXTSbTibol2Q&s"
            alt=""
          />
          <h2 className="text-xl font-medium">
            {props.ride?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">3.9 KM</h5>
      </div>
      <div className="flex gap-3 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">563 /11-B</h3>
              <p className="text-base -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill "></i>
            <div className="">
              <h3 className="text-lg font-medium">563 /11-B</h3>
              <p className="text-base -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" text-lg ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <button
            onClick={endRide}
            className="w-full flex items-center justify-center bg-green-500 text-white font-semibold p-2 rounded-lg mt-2"
          >
            Finish Ride
          </button>
          <p className="text-red-400 mt-6 text-xs">
            Click on finish ride button if you have completed the Ride
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinsihRide;
