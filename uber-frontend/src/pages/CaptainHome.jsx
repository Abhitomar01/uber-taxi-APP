import React, { useRef } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";




const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false)
  const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef =useRef(null)
  const ConfirmRidePopupPanelRef= useRef(null)
  const [ride,setRide] = useState(null)

  const {socket} =useContext(SocketContext)
  const {captain} = useContext(CaptainDataContext)
  console.log(captain)

  useEffect(()=>{
    
    socket.emit('join',{
      userId:captain._id,
      userType:'captain'
    })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
         // console.log({userId:captain._id,
           // location:{
             // ltd:position.coords.latitude,
              //lng:position.coords.longitude
        //}})
         socket.emit('update-location-captain',{
          userId:captain._id,
          location:{
            ltd:position.coords.latitude,
            lng:position.coords.longitude
          }
         })
        })
      }
    }
    const locationInterval =setInterval(updateLocation,1000)
    updateLocation()
    //return ()=>clearInterval(locationInterval)
})
    
  socket.on('new-ride',(data)=>{
    console.log(data)
    setRide(data)
      setridePopupPanel(true)
      

  })

  async function confirmRide(){
     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId:ride._id,
      captainId:captain._id,
     }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // ✅ Correct placement
      }
    })
    setConfirmRidePopupPanel(true)
    setridePopupPanel(false)
    

  }
  console.log(captain._id)

  useGSAP(function(){
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[ridePopupPanel])


  useGSAP(function(){
    if(ConfirmRidePopupPanel){
      gsap.to(ConfirmRidePopupPanelRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(ConfirmRidePopupPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[ConfirmRidePopupPanel])
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img className="w-16" src="/uba-logo2.png" alt="" />
        <Link
        to="/captain-login"
        className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className=" text-lg font-bold ri-logout-box-r-line"></i>
      </Link>
      </div>
      <div className="h-3/5   relative z-[-1]">
       <LiveTracking/>
      </div>
      <div className="h-2/5 p-6">
        
      <CaptainDetails/>
          
      </div>
      <div ref={ridePopupPanelRef}  className='fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-10 pt-14'>
        <RidePopUp
        ride={ride}
        setridePopupPanel={setridePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        confirmRide={confirmRide}
        />
       </div>
       <div ref={ConfirmRidePopupPanelRef}  className='fixed w-full h-screen z-10 bottom-0 translate-y-full   bg-white px-3 py-10 pt-14'>
        <ConfirmRidePopUp
        ride={ride}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} setridePopupPanel={setridePopupPanel}/>
       </div>
    </div>
  );
};

export default CaptainHome;
