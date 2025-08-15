import React from "react";

const SkeletonMusicCard = () => {
  return (
    <div className="aspect-[1/1] min-w-[300px] max-w-[300px] rounded-3xl shadow-md overflow-hidden relative animate-pulse bg-gray-200">
      
      <div className="w-full h-full object-cover bg-gray-300"></div>

      <div className="h-1/3 w-full absolute bottom-0 left-0">
        
        <div className="w-full h-full absolute bottom-0 left-0 bg-gray-400/50"></div>
        
        <div className="grid grid-cols-4 gap-1 w-full absolute bottom-0">
          <div className="col-span-3 p-5 pr-0 tracking-wide truncate">
            
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
            
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          
          <div className="p-5 absolute bottom-0 right-0">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="p-5 absolute top-0 right-0">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonMusicCard;
