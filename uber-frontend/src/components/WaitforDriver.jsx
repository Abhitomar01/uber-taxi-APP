import React from 'react'

const WaitforDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.waitingForDriver(false);
        }}
        className="p-2 text-center absolute top-0 w-[93%]"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <div className='flex items-center justify-between'>
        <img className=' h-13' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>Sarthak</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP15 ON 2019</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Swift</p>
        </div>
      </div>
      
      <div className="flex gap-3 flex-col justify-between items-center">
        
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lgri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">563 /11-B</h3>
              <p className="text-base -mt-1 text-gray-600">
                kankar kheda meerut uttarPardesh
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill "></i>
            <div className="">
              <h3 className="text-lg font-medium">563 /11-B</h3>
              <p className="text-base -mt-1 text-gray-600">
                kankar kheda meerut uttarPardesh
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" text-lg ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium"> 193.20</h3>
              <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitforDriver