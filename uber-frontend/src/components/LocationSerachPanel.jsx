import React from 'react'

const LocationSerachPanel = (props) => {

  //sample array for location
  const locations =[
    '24B,Near Begampul,Meerut,uttarPardesh',
    '29C,Near meerut college,Meerut,uttarPardesh',
    '11B,Near surajkund park,Meerut,uttarPardesh',
    '16D,Near modi mandir,Modinagar,uttarPardesh',
    '10A,Near Yasodha Hospital,Ghaziabad,uttarPardesh',
    '12A,Near Raj nagar Extension,Ghaziabad,uttarPardesh'
  ]
  return (
    <div>
      {
        locations.map(function(elem,idx){
          return <div key={idx} onClick={()=>{
            props.setVehicalPanel(true)
            props.setPanelOpen(false)
          }} className="flex gap-4 active:border-black border-2 border-white p-3 rounded-xl justify-start my-2 items-center">
          <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill "></i></h2>
          <h4 className='font-medium'>
            {elem}
          </h4>
        </div>
        })
      }
    </div>
  )
}

export default LocationSerachPanel