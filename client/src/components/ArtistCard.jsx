import React from "react";

const play = <svg xmlns="http://www.w3.org/2000/svg" className="w-15 h-15" width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M18.89 12.846c-.353 1.343-2.023 2.292-5.364 4.19c-3.23 1.835-4.845 2.752-6.146 2.384a3.25 3.25 0 0 1-1.424-.841C5 17.614 5 15.743 5 12s0-5.614.956-6.579a3.25 3.25 0 0 1 1.424-.84c1.301-.37 2.916.548 6.146 2.383c3.34 1.898 5.011 2.847 5.365 4.19a3.3 3.3 0 0 1 0 1.692"/></svg>;

export default function ArtistCard({ name, image, onClick }) {
  return (
    <div className="aspect-[7/10] min-w-[300px] max-w-[300px] rounded-3xl shadow-md overflow-hidden relative group bg-gray-400/50">
      {/* Artist image */}
      <img src={image} alt={name} className="w-full h-full object-cover" />

      {/* Center play button */}
      <div className="p-5 absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <button onClick={onClick} className="p-5 h-fit backdrop-blur-md bg-black/40 hover:bg-red-600 active:scale-95 text-slate-200 hover:text-white rounded-full transition duration-200 opacity-0 group-hover:opacity-100">
              { play }
          </button>
      </div>

      {/* Bottom overlay */}
      <div className="h-1/6 w-full absolute bottom-0 left-0">
            <div className="w-full h-full absolute bottom-0 left-0 backdrop-blur-md mask-to-b"></div>
            <div className="w-full h-full absolute bottom-0 left-0 backdrop-blur-md mask-to-b"></div>
            <div className="w-full h-full absolute bottom-0 left-0 backdrop-blur-md mask-to-b"></div>
            <div className="w-full h-full absolute bottom-0 left-0 backdrop-blur-md mask-to-b"></div>

            <div className="grid grid-cols-4 gap-1 w-full absolute bottom-0">
                <div className="col-span-4 p-5 tracking-wide truncate mask-to-l">
                    <div>
                        <h3 className="text-xl font-semibold text-center font-montserrat text-white/90 drop-shadow-sm/40">{name}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
