import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

const Captainsignup = () => {

  const navigate=useNavigate()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [userData,setUserData] = useState({})

  const {caotain,setCaptain} = React.useContext(CaptainDataContext)
  const [vehicalColor,setVehicalColor] =useState('')
  const [vehicalPlate,setVehicalPlate] =useState('')
  const [vehicalCapacity,setVehicalCapacity] =useState('')
  const [vehicalType,setVehicalType] =useState('')

    const submitHandler = async(e)=>{
      e.preventDefault()
      const captainData = {
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email:email,
        password:password,
        vehical:{
          color:vehicalColor,
          plate:vehicalPlate,
          capacity:vehicalCapacity,
          vehicaltype:vehicalType
      }
    }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captainData)
      if(response.status === 201){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      }

      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
      setVehicalColor('')
      setVehicalPlate('')
      setVehicalCapacity('')
      setVehicalType('')
    }
  return (
     <div className='py-5 px-5 flex flex-col justify-between h-screen'>
          <div>
          <img className="w-20 mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />
          <form onSubmit={(e)=>{submitHandler(e)}}>
    
          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-4'>
          <input className='bg-[#eeeeee] mb-5 w-1/2 rounded px-2 py-2 border text-lg placeholder:text-base'
          value={firstName}
          onChange={(e)=>{
            setFirstName(e.target.value)
          }}
           required type="text" placeholder=' First Name' />
          <input className='bg-[#eeeeee] mb-5 w-1/2 rounded px-2 py-2 border  text-lg placeholder:text-base'
          value={lastName}
          onChange={(e)=>{
            setLastName(e.target.value)
          }}
           required type="text" placeholder='Last Name' />
          </div>
          <h3 className='text-lg font-medium mb-2 '>What's your email</h3>
          <input className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base' 
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          type="email" placeholder="Email@example.com"  required /> 
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
           required type="text" placeholder='Password' />
           <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
           <div className='flex gap-4 mb-5'>
          
          <input className='w-1/2 bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
          value={vehicalColor}
          onChange={(e)=>{
            setVehicalColor(e.target.value)
          }}
          required type="text" placeholder='Vehicle Color' />

          
          <input className=' w-1/2 bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
          value={vehicalPlate}
          onChange={(e)=>{
            setVehicalPlate(e.target.value)
          }}
          required type="text" placeholder='Vehicle Plate' />
          </div>
          <div className='flex gap-4 mb-5'>
          
          <input className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
          value={vehicalCapacity}
          onChange={(e)=>{
            setVehicalCapacity(e.target.value)
          }}
          required type="number" placeholder='Vehicle Capacity'/>

          
          <select className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
          value={vehicalType}
          onChange={(e)=>{
            setVehicalType(e.target.value)
          }}
          required>
            <option value="" disabled>Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="bike">Bike</option>
          </select>

          </div>


          <button className='bg-[#111]  text-white font-semibold mb-3 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
          >Create Captain account</button>
            <p className='text-center '>Already have a account?<Link to='/captain-login' className='text-blue-600'>Log in here.</Link></p>
          </form>
          </div>
          <div>
            <p className='text-xs mt-6'>By proceeding, you consent to get call ,whatsapp and SMS ,Message including by automated means , from Uber and Its artifilates to the number provided</p>
          </div>
        </div>
  )
}

export default Captainsignup