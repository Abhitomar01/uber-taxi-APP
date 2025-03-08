import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Captainlogin = () => {

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [CaptainData,setCaptainData] = useState('')
    const submitHandler = (e) => { 
      e.preventDefault()
      setCaptainData({
        email:email,
        password:password
      })
      console.log(userData)
      setEmail('')
      setPassword('')
     }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <img className="w-20 mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />
      <form onSubmit={(e)=>{submitHandler(e)}}>
      <h3 className='text-lg font-medium mb-2 '>What's your email</h3>
      <input className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base' 
      onChange={(e) => setEmail(e.target.value)}
      type="email" placeholder="Email@example.com" value={email} required /> 
      <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
      <input className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
      onChange={(e) => setPassword(e.target.value)}
      value={password}
       required type="text" placeholder='Password' />
      <button className='bg-[#111]  text-white font-semibold mb-3 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
      >Login</button>
        <p className='text-center'>Join the Uber<Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </form>
      </div>
      <div>
        <Link to='/login' className='bg-[#d5622d] flex items-center justify-center  text-white font-semibold mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
        >Sign in as a User</Link>
      </div>
    </div>
  )
}

export default Captainlogin