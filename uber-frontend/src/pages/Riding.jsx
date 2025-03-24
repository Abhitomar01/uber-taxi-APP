import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
  const location = useLocation()
  const { ride } = location.state || {}  // <-- get ride data from location state
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!socket) return;
    const rideEndedHandler = () => {
      navigate('/home')
    }
    socket.on('ride-ended', rideEndedHandler)
    return () => {
      socket.off('ride-ended', rideEndedHandler)
    }
  }, [socket, navigate])

  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className=' text-lg font-bold ri-home-5-line'></i>
      </Link>
      <div className='h-1/2  relative z-[-1]'>
        <LiveTracking/>
      </div>
      <div className='h-1/2 p-4'>
      
        <div className='flex items-center justify-between'>
          <img className=' h-13' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehical.plate}</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Swift</p>
          </div>
        </div>
        <div className="flex gap-3 flex-col justify-between items-center">
        
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill "></i>
            <div className="">
              <h3 className="text-lg font-medium">563 /11-B</h3>
              <p className="text-base -mt-1 text-gray-600">
                {ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" text-lg ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>

        <button className='w-full bg-green-500 text-white font-semibold p-2 rounded-lg mt-5'>Make Payment</button>
      </div>
    </div>
  )
}

export default Riding