import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSerachPanel from '../components/LocationSerachPanel';
import VehicalPanel from '../components/VehicalPanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitforDriver from '../components/WaitforDriver';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehicalPanel, setVehicalPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicalFound, setVehicalFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const {socket} = useContext(SocketContext);
  const {user} =useContext(UserDataContext)
  const navigate = useNavigate()


  useEffect(()=>{
    console.log(user)
    socket.emit("join",{userType:"user",userId:user._id})
  } ,[user])

  socket.on('ride-confirmed',(ride)=>{
    console.log("the ride is",ride)
    setVehicalFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } }) // <-- pass ride data as state
  })
  // Refs
  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const vehicalPanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicalFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  // Form submission
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  // Fetch pickup suggestions
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: encodeURIComponent(e.target.value) },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data)
      setPickupSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Fetch destination suggestions
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: encodeURIComponent(e.target.value) },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data)
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // GSAP animations
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '70%' : '0%',
      opacity: panelOpen ? 1 : 0,
      padding: panelOpen ? 20 : 0,
      duration: 0.5,
    });
    gsap.to(panelClose.current, {
      opacity: panelOpen ? 1 : 0,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehicalPanelRef.current, {
      transform: vehicalPanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [vehicalPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicalFoundRef.current, {
      transform: vehicalFound ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [vehicalFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [waitingForDriver]);


  const findTrip = async () => {
    if (!pickup || !destination) {
      console.error('Pickup and destination are required');
      return;
    }
  
    try {
      setVehicalPanel(true);
      setPanelOpen(false);
  
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { 
            pickup, // ✅ Removed encodeURIComponent
            destination 
          },
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          },
        }
      );
      console.log('Fare:', response.data);
      setFare(response.data);
    } catch (error) {
      console.error('Error fetching fare:', error.response?.data?.message || error.message);
    }
  };

 async function createRide(){
   const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,
      destination,
      vehicleType
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data)
  
    }
  
  

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber logo */}
      <img
        className="w-16 absolute left-5 top-5"
        src="/uba-logo.png"
        alt="Uber Logo"
      />

      {/* Map */}
      <div className="h-screen">
        <LiveTracking/>
      </div>

      {/* Trip form */}
      <div className="absolute h-screen top-0 w-full flex flex-col justify-end">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelClose}
            onClick={() => setPanelOpen(false)}
            className="opacity-0 absolute top-6 right-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-2">Find a Trip</h4>
          <form onSubmit={submitHandler}>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-3"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
          onClick={findTrip}
          className='bg-black text-white px-4 py-2 rounded-lg w-full mt-3'>
            Find a Trip
          </button>
        </div>

        {/* Panels */}
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSerachPanel 
            setPanelOpen={setPanelOpen} 
            setVehicalPanel={setVehicalPanel} 
            locations={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions} 
            onSelectLocation={(location) => {
              if (activeField === 'pickup') {
                setPickup(location?.structured_formatting?.main_text || '');
              } else if (activeField === 'destination') {
                setDestination(location?.structured_formatting?.main_text || '');
              }
            }}
          />
        </div>

        {/* Vehicle, Confirm, and Driver Panels */}
        <div ref={vehicalPanelRef} className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-10 pt-14">
          <VehicalPanel
          selectVehicle={setVehicleType}
          
          fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehicalPanel={setVehicalPanel} />
        </div>
        <div ref={confirmRidePanelRef} className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
          <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicalFound={setVehicalFound} setConfirmRidePanel={setConfirmRidePanel} />
        </div>
        <div ref={vehicalFoundRef} className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
          <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicalFound={setVehicalFound} />
        </div>
        <div ref={waitingForDriverRef} className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
          <WaitforDriver
          waitingForDriver={waitingForDriver}
          ride={ride}
         setVehicalFound={setVehicalFound}
         setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;
