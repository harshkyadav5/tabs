import React from "react";
import { PlayIcon } from "./icons";

const play = <PlayIcon className="w-15 h-15" />;

export default function ArtistCard({ name, image, onClick }) {
  return (
    <div className="aspect-[7/10] min-w-[300px] max-w-[300px] rounded-panel shadow-md overflow-hidden relative group bg-gray-400/50">
      {/* Artist image */}
      <img src={image} alt={name} className="w-full h-full object-cover" />

      {/* Center play button */}
      <div className="p-5 absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <button onClick={onClick} className="p-5 h-fit backdrop-blur-md bg-black/40 hover:bg-music-accent active:scale-95 text-slate-200 hover:text-white rounded-full transition duration-200 opacity-0 group-hover:opacity-100">
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
