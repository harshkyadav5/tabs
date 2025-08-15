import React from "react";

const SkeletonArtistCard = () => {
  return (
    <div className="aspect-[7/10] min-w-[300px] max-w-[300px] rounded-3xl shadow-md overflow-hidden relative animate-pulse bg-gray-200">
      
      <div className="w-full h-full object-cover bg-gray-300"></div>

      <div className="p-5 absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
      </div>

      <div className="h-1/6 w-full absolute bottom-0 left-0">
        
        <div className="w-full h-full absolute bottom-0 left-0 bg-gray-400/50"></div>
        
        <div className="grid grid-cols-4 gap-1 w-full absolute bottom-0">
          <div className="col-span-4 p-5">
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonArtistCard;
