import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const submitHandler= async(e)=>{
    e.preventDefault()
    if (!props.ride || !props.ride._id) {
      console.error("Ride object or ride ID is missing");
      return;
    }
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
      params:{
      rideId:props.ride._id,
      otp:otp
    }, headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // ✅ Correct placement
    }

    })
    if(response.status===200){
      props.setConfirmRidePopupPanel(false)
      props.setridePopupPanel(false)
      navigate('/captain-riding', { state: { ride: props.ride } })
    }
    
    console.log(response)

  }
  return (
    <div>
      <h5
        onClick={() => {
          props.setridePopupPanel(false);
        }}
        className="p-2 text-center absolute top-0 w-[93%]"
      >
        <i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5"> Confirm this Ride</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4">
        <div className="flex items-center gap-3 mt-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUueKMdnTNO_ItCNq3y606v5XXTSbTibol2Q&s"
            alt=""
          />
          <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname}</h2>
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
              <h3 className="text-lg font-medium">{props.ride?.fare}</h3>
              <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <form
          onSubmit={submitHandler}
            
          >
            <input
            value={otp}
            onChange={(e)=>
              setOtp(e.target.value)
            } 
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter OTP"
            />
            <button
            
              className="w-full flex items-center justify-center bg-green-500 text-white font-semibold p-2 rounded-lg mt-2"
            >
              Confirm
            </button>
            <button
            type="button"
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setridePopupPanel(false);
              }}
              className="w-full bg-red-400 text-white font-semibold p-2 rounded-lg mt-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
