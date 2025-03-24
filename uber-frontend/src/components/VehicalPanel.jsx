import React from 'react'

const VehicalPanel = (props) => {
  return (
    <div>
        <h5
       onClick={()=>{
        props.setVehicalPanel(false)
      }}
       className='p-2 text-center absolute top-0 w-[93%]'><i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5' >Choose a Vehical</h3>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.selectVehicle('car')

        }}  className='flex border-2 active:border-black border-white  mb-2 rounded-xl w-full p-3  items-center justify-between'>
          <img className='h-15' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>Uber Go <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 min away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable ,compact rides</p>
          </div>
          <h2 className='text-2xl font-semibold'>₹{props.fare.car}</h2>
        </div>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.selectVehicle('bike')
        }} className='flex border-2 active:border-black mb-2 border-white rounded-xl w-full p-3  items-center justify-between'>
          <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>3 min away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable,motorcycle rides</p>
          </div>
          <h2 className='text-2xl font-semibold'>₹{props.fare.bike}</h2>
        </div>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.selectVehicle('auto')
        }} className='flex border-2 active:border-black mb-2 border-white rounded-xl w-full p-3  items-center justify-between'>
          <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>3 min away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable,Auto rides</p>
          </div>
          <h2 className='text-2xl font-semibold'>₹{props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default VehicalPanel