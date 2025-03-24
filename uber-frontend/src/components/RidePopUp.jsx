import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
          <h5
       onClick={()=>{
        props.setridePopupPanel(false)
      }}
       className='p-2 text-center absolute top-0 w-[93%]'><i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
       <h3 className='text-2xl font-semibold mb-5'> New Ride Available</h3>
       <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4'>
        <div className='flex items-center gap-3 mt-3'>
          <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUueKMdnTNO_ItCNq3y606v5XXTSbTibol2Q&s" alt="" />
          <h2 className='text-xl font-medium'>
  {props.ride?.user?.fullname?.firstname || "Unknown"} {props.ride?.user?.fullname?.lastname || "User"}
</h2>

        </div>
        <h5 className='text-lg font-semibold'>3.9 KM</h5>
       </div>
       <div className='flex gap-3 flex-col justify-between items-center'>
       
      <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
        <i className=" text-lg ri-map-pin-user-fill"></i>
        <div className=''>
            <h3 className='text-lg font-medium'>563 /11-B</h3>
            <p className='text-base -mt-1 text-gray-600'>{props.ride?.pickup}</p>
        </div>  

        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
        <i className=" text-lg ri-map-pin-fill "></i>
        <div className=''>
            <h3 className='text-lg font-medium'>563 /11-B</h3>
            <p className='text-base -mt-1 text-gray-600'>{props.ride?.destination}</p>
        </div>
        </div>
        <div className='flex items-center gap-5 p-3 '>
        <i className=" text-lg ri-currency-line"></i>
        <div className=''>
            <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
            <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
        </div>
        
        </div>
      </div>
      <div className='flex w-full items-center justify-between mt-5 '>
      <button onClick={()=>{
        props.setConfirmRidePopupPanel(true)
        props.confirmRide()
      }} className=' bg-green-500 text-white font-semibold p-3 px-8 rounded-lg '>Accept</button>
            <button onClick={()=>{
     props.setridePopupPanel(false)
      }} className=' bg-gray-400 text-white font-semibold p-3 px-8 rounded-lg mt-2'>Ignore</button>
     
      </div>
       </div>
    </div>
  )
}

export default RidePopUp