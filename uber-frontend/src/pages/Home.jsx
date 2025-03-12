import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSerachPanel from '../components/LocationSerachPanel';
import VehicalPanel from '../components/VehicalPanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitforDriver from '../components/WaitforDriver';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const vehicalPanelRef =useRef(null)
  const confirmRidePanelRef =useRef(null)
  const vehicalFoundRef =useRef(null)
  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const waitingForDriverRef = useRef(null)
  const [vehicalPanel,setVehicalPanel] =useState(false)
  const [ConfirmRidePanel,setConfirmRidePanel]=useState(false)

  const [vehicalFound,setVehicalFound] =useState(false)
  const [waitingForDriver ,setWaitingForDriver] =useState(false)

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  
  useGSAP ( function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        duration:1,
        opacity:1,
        padding:20
      });
      gsap.to(panelClose.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        opacity:0,
        padding:0
      })
      gsap.to(panelClose.current,{
        opacity:0
      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehicalPanel){
      gsap.to(vehicalPanelRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(vehicalPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehicalPanel])

  useGSAP(function(){
    if(ConfirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[ConfirmRidePanel])

  
  useGSAP(function(){
    if(vehicalFound){
      gsap.to(vehicalFoundRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(vehicalFoundRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehicalFound])

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[waitingForDriver])

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div  className="h-full w-screen ">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="absolute h-screen top-0 w-full flex flex-col justify-end">
        <div className="h-[30%] p-6 bg-white relative">
        <h5 ref={panelClose}
         onClick={()=>{
          setPanelOpen(false)
        }} className=' opacity-0 absolute top-6 right-6  text-2xl'>
           <i className="ri-arrow-down-wide-line"></i>
           </h5>
          <h4 className="text-2xl font-semibold w-full mb-2 ">Find a Trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-400 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-3"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSerachPanel panelOpen={panelOpen} setPanelOpen={setPanelOpen} vehicalPanel={vehicalPanel} setVehicalPanel={setVehicalPanel}/>
        </div>
      </div>
      <div ref={vehicalPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-14'>
        <VehicalPanel setConfirmRidePanel={setConfirmRidePanel} setVehicalPanel={setVehicalPanel}/>
       </div>
       <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-12'>
       <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicalFound={setVehicalFound}/>
       </div>

       <div ref={vehicalFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-12'>
            <LookingForDriver setConfirmRidePanel={setConfirmRidePanel} setVehicalFound={setVehicalFound}/>
       </div>
       <div ref={waitingForDriverRef}  className='fixed w-full z-10 bottom-0   bg-white px-3 py-6 pt-12'>
            <WaitforDriver waitingForDriver={waitingForDriver}/>
       </div>
    </div>
  );
};

export default Home;
 