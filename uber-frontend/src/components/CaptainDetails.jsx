import React from 'react';
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
  const { captain, isLoading, error } = useContext(CaptainDataContext);

  console.log("🚀 Captain data:", captain);

  if (isLoading) return <div>Loading captain data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!captain) return <div>No captain data available</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img 
            className="h-10 w-10 rounded-full object-cover" 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" 
            alt="Captain" 
          />
          <h4 className="text-lg font-medium captialize">
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹293.20</h4>
          <p className="text-sm text-gray-500">Earned</p>
        </div>
      </div>
      <div className="flex p-4 mt-8 bg-gray-200 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-light ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-light ri-speed-up-fill"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-light ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
