import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehicalFound(false);
        }}
        className=" text-center absolute top-0 w-[93%]"
      >
        <i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>
      <div className="flex gap-2 flex-col justify-between items-center">
        <img
          className="h-20"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">563 /11-B</h3>
              <p className="text-base -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill "></i>
            <div className="">
              <h3 className="text-lg font-medium">563 /11-B</h3>
              <p className="text-base -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" text-lg ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">{props.fare[props.vehicleType]}</h3>
              <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
