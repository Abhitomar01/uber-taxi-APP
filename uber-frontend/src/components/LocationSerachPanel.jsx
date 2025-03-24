import React from 'react';

const LocationSearchPanel = ({ locations = [], setVehicalPanel, setPanelOpen, onSelectLocation }) => {
  const handleLocationSelect = (location) => {
   // setVehicalPanel(true);
    //setPanelOpen(false);
    onSelectLocation(location); // ✅ Pass selected location back to parent
  };

  return (
    <div>
      {locations?.map((elem, idx) => (
        <div 
          key={idx} 
          onClick={() => handleLocationSelect(elem)} 
          className="flex gap-4 active:border-black border-2 border-white p-3 rounded-xl justify-start my-2 items-center cursor-pointer"
        >
          {/* Icon */}
          <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
            <i className="ri-map-pin-fill"></i>
          </h2>

          {/* ✅ Display structured data */}
          <div>
            <h4 className='font-medium'>
              {elem?.structured_formatting?.main_text || 'Unknown Location'}
            </h4>
            <p className='text-gray-500 text-sm'>
              {elem?.structured_formatting?.secondary_text || ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
